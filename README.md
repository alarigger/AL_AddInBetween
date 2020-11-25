# AL_AddInBetween
adds an inbetween key with pourcentage 

Installation et utilisation du script “AL_AddInBetween”



Date : 25/11/2020
Auteur : Alexandre Cormier 
site : http://www.alarigger.com/

Telecharger les fichiers : 

Fermer Toonboom 
télécharger les fichier du script - I C I - : 
dezippez le winrar 






installer les raccourcis 

	Copiez le fichier “shortcut.xml”

	

	allez dans  le dossier suivant (sous windows) : 
c:/Program Files (x86)/Toon Boom Animation/Toon Boom Harmony 20 Premium/resources/

	coller “shortcuts.xml” et cliquer “remplacer le fichier”


Importer le script dans toonboom

	Lancez Toonboom 
	Dans votre scene cliquez sur le bouton du script manager

	

	si le script “AL_AddInBetween.js n’est pas présent continuer de lire
sinon vous pouvez passer direct à l’étape 4


Dans la Fenetre “Script Editor” cliquer sur “import Script”






Selectionnez le script téléchargé 






laissez en “user” et cliquez sur “Save” 



Activer le script

Dans le script manager passer toute la liste du centre à droite avec la fleche sauf “AddInBetween_process”



votre bar “scripting” devrait ressembler à ça 

Utilisation du script

cliquer sur la timeline est lancer un des script qui creera alors une clef à x pourcentage entre la clef précédente et la clef suivante (50)




il est aussi possible de mettre un pourcentage negatif pour une clef d’anticipe ici -30


ou meme supérieur à 100 pour un “overshoot”
ici “120”



Attribution des raccourcis 

si le fichier “shortcut.xml” à bien été remplacé 
vous devriez voir dans votre liste de raccourcis assignables un sous groupe “tween_script”



Vous pouvez alors leur assigner le raccourcis souhaité comme pour chaque fonctionnalité 


