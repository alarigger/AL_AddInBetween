function AL_AddInBetween (){

	// Adds a key between two keyframes at a given point between the two values. 


	/*

	distance = pointB - pointA
	pointC  = distance/ease

	2 = 50%


	*/

	// VARIABLES 



	var selected_nodes = selection.selectedNodes(0);
	
	var CURRENT_FRAME = frame.current();
	var numSelLayers = Timeline.numLayerSel;
	
	var INTERPOLATION_FACTOR = 1
	


	// EXECUTION 

	MessageLog.trace("AL_AddInBetween");
	
	nodes_to_treat = filter_nodes_by_type(selected_nodes,["READ","PEG","CurveModule","OffsetModule","BendyBoneModule"])
	MessageLog.trace("nodes to treat : ");
	MessageLog.trace(nodes_to_treat);
	
	
	
	columns_to_treat = fetch_colummns(nodes_to_treat)
		MessageLog.trace("columns_to_treat");
	MessageLog.trace(columns_to_treat);
	columns_to_treat = filter_columns_by_type(columns_to_treat,["3DPATH","BEZIER","EASE","QUATERNIONPATH"])
	MessageLog.trace("columns_to_treat");
	MessageLog.trace(columns_to_treat);
	
	
	treat_columns(columns_to_treat,INTERPOLATION_FACTOR);
	
	InputDialog();
	

	// FONCTIONS 

	function InputDialog (){
		
		
		
	}

	function filter_nodes_by_type(nodes_list,relevant_types){
		
		MessageLog.trace(nodes_list);
		MessageLog.trace(relevant_types);
		var relevant_nodes = Array();

		for(var n = 0 ; n < nodes_list.length; n++){ 

			var currentNode = nodes_list[n];
			
			//dynamic array search : add sub nodes to the loop 
			if(node.type(currentNode)=="GROUP"){
				
				var currentGroup = currentNode
				var subNodesInGroup= node.numberOfSubNodes(currentGroup);
						
				for (var sn = 0; sn<subNodesInGroup;sn++){

					var sub_node= node.subNode(currentGroup,sn);
					nodes_list.push(sub_node);

				} 

			} 
			
			if(relevant_types.indexOf(node.type(currentNode))!=-1){
				relevant_nodes.push(currentNode);
			}

		} 	
		return relevant_nodes; 
	}

	function fetch_colummns(nodes_list){
		
		var columns_list = Array();
		
		
		
		for(var n = 0 ; n < nodes_list.length; n++){ 
		
			var currentNode = nodes_list[n];
			
			var linked_columns = get_linked_columns(currentNode);
			
			if(linked_columns.length >0){
				columns_list = columns_list.concat(linked_columns);
			}
		}
		
		
		return unique_array(columns_list); 
		
	}
	
	
	function treat_columns(column_list,factor){
		
		for(var c = 0 ;c < column_list.length; c++){ 
			
			var current_column = column_list[c]
			add_inBetween_key(factor,column_list[c]);
			
		}
		
		return true
		
	}
	
	function get_next_bezierkey(_column,_frame){

		var key = "";
		var s = 0;

		MessageLog.trace(frame.numberOf());
		
		for (var f = _frame ; f<=frame.numberOf();f++){
				if(column.isKeyFrame(_column,s,f)){
					
					key = column.getEntry(_column,s,f)
					return key;
					
				}
			
					
		}
		

	}
	
	function get_previous_bezierkey(_column,_frame){

		var key = "";
		var s = 0;
		
		for (var f = _frame ; f>=0;f--){
			
				if(column.isKeyFrame(_column,s,f)){
					
					key = column.getEntry(_column,s,f)
					return key;
					
				}
			
	
		}
		

	}
	
	
	function get_next_3Dkey(_column,_frame){

		sub_column = 4;
		key = Array();
		s = 1;
		
		for (var f = _frame ; f<=frame.numberOf();f++){
				

				 if(column.isKeyFrame(_column,s,f)){
		
					for (s = s ; s<sub_column;s++){

						key.push(column.getEntry(_column,s,f))

					}

					var p = new Point3d (key[1],key[2],key[3])
					key = p;
					
					
					return key;
	
				}
					
		}
		

	}
	
	function get_previous_3Dkey(_column,_frame){

		sub_column = 4;
		key = Array();
		s = 1;
		
		for (var f = _frame ; f>=0;f--){
				

				if(column.isKeyFrame(_column,s,f)){
		
					for (s = s ; s<sub_column;s++){

						key.push(column.getEntry(_column,s,f))

					}

					var p = new Point3d (key[1],key[2],key[3])
					key = p;
					
					
					return key;
	
				}
					
		}
		

	}
	function add_inBetween_key(_ratio,_column){
			
			var ratio= 2;
			var new_key = null;
			var column_type = ""
			var next_key = ""
			var previous_key = ""
			
			if(column.type(_column) =="3DPATH"){
				
				next_key = get_next_3Dkey(_column,CURRENT_FRAME)
				previous_key = get_previous_3Dkey(_column,CURRENT_FRAME)
				
				new_key = interpolate_3d(previous_key,next_key,ratio);
				
				column.setEntry(_column,1,CURRENT_FRAME,new_key[1]);
				column.setEntry(_column,2,CURRENT_FRAME,new_key[2]);
				column.setEntry(_column,3,CURRENT_FRAME,new_key[3]);
				
				setKeyFrame (_column, CURRENT_FRAME)
				
			}else{
				
				next_key = get_next_bezierkey(_column,CURRENT_FRAME)
				previous_key = get_previous_bezierkey(_column,CURRENT_FRAME)
				new_key = interpolate_bezier (previous_key,next_key,ratio)
				
				column.setEntry(_column,1,CURRENT_FRAME,new_key,0);
			}
			
			MessageLog.trace(next_key)
			MessageLog.trace(previous_key)
			MessageLog.trace(new_key)
			
			
			
			return new_key;
			

		
	}
	
	function interpolate_bezier (_valueA,_valueB,_ratio){
		
			var  A = parseFloat(_valueA);
			var  B = parseFloat(_valueB);
			
			return A + ((B-A)/_ratio);
		
	}
	
	function interpolate_3d (p1,p2,_ratio){
	
		var result = Array();
		var p3 = new Point3d().interpolate(_ratio,p1,p2)
		
		result.push(p3.x);
		result.push(p3.y);
		result.push(p3.z);
			
		return result;
		
	}
		
	
	function get_linked_columns(_node){
		
		var node_columns = Array();
	
		var attrList = getAttributesNameList (_node);
		
		for (var i=0; i<attrList.length; i++){
			
			var attribute_name = attrList[i]
			
			var linked_column = node.linkedColumn(_node,attribute_name)
			
			if( linked_column !=""){
				
				MessageLog.trace(attribute_name);

				node_columns.push(linked_column);
			}
			
		}
		
		return node_columns;
		
		
	}
	
	function unique_array(arr){
		
		var unique_array = Array();
		for(var i = 0 ; i<arr.length;i++){
			if(unique_array.indexOf(arr[i])==-1){
				unique_array.push(arr[i]);
			}
		}
		return unique_array;
		
	}
	
	
	
	function filter_columns_by_type (column_list,relevant_types){
		var filtered_list = Array();
		
		for(var i = 0 ; i<column_list.length;i++){
			
				if(relevant_types.indexOf(column.type(column_list[i]))!=-1){
					
					filtered_list.push(column_list[i])
					
					MessageLog.trace(column.type(column_list[i]));
					
				}
		}
		
		return filtered_list;
	}
	
	
	
	function getAttributesNameList (snode){
		
		var attrList = node.getAttrList(snode, frame.current(),"");
		var name_list= Array();
		
		for (var i=0; i<attrList.length; i++){	

			var attr = attrList[i];
			var a_name = attr.keyword();
			var sub_attr = attr.getSubAttributes()
			name_list.push(a_name);

			if(sub_attr.length > 0){
				for (var j=0; j<sub_attr.length; j++){	
					attrList.push(sub_attr[j]);
					var sub_attr_name = a_name+"."+sub_attr[j].keyword()
					name_list.push(sub_attr_name);
				}
			}
		
		}
		
		return name_list;
		
	}
	
	
	function get_node_attributes(node){
	
		
		
	}

}
