function AL_AddInBetween (){

	// Adds a key between two keyframes at a given point between the two values. 


	/*

	distance = pointB - pointA
	pointC  = distance/ease

	2 = 50%


	*/

	// VARIABLES 

	var RATIO = 1

	var selected_nodes 
	var selected_pegs = Array();
	var columns_to_treat =  Array()
	
	
	treat_columns(columns_to_treat);


	// EXECUTION 

 
	pegs_to_treat = fetch_pegs(selected_nodes)
	columns_to_treat = fetch_colummns(pegs_to_treat)
	
	InputDialog();
	

	// FONCTIONS 

	function InputDialog (){
		
		
		
	}

	function fetch_pegs(nodes_list){
		
		var peg_list = Array();
		
		for (node in nodes_list){
			
			
		}		
		
		return peg_list; 
	}

	function fetch_colummns(peg_list){
		
		var columns_list = Array();
		
		for (peg in peg_list){
			
			
		}
		
		
		
		return columns_list; 
		
	}
	
	function treat_columns(columns_list){
		
		for (col in columns_list){
			
			
		}
		
		return true
		
	}

	function add_inBetween_key(ratio,column){
		

		
	}

}
