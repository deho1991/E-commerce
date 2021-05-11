var estFormulaireValide = true;

var patternEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var patternCodePostal = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;
var patternSansChiffre = /^[a-zA-Z]+$/;

var loginStorage = localStorage.getItem("loginStorage");
var passwordStorage = localStorage.getItem("passwordStorage");

// vérifie si un champ est rempli :
function estRempli(idElement)
{
	// si champ non rempli (value vide)
	if ($("#" + idElement + "").val().length == 0)
	{
		// je met le flag de vérification du formulaire à false :
		estFormulaireValide = false;
		// habillage de la zone de texte en mode erreur (rouge)
		$("#" + idElement + "").addClass("erreur");
		// je quitte la fonction :
		return;
	};

	// l'élément est valide : je réinitialise son apparence :
	$("#" + idElement + "").removeClass("erreur");
};


// vérifie si un radio button est checké au sein d'un groupe de radio buttons (attribut Name) :
function verifierRadioButton(groupName)
{
	// je parcours les radio buttons du groupe pour vérifier que l'un d'entre eux est checké :	
	for (var i = 0; i < $("input[name=" + groupName + "]").length; i++)
	{
		if ($("input[name=" + groupName + "]")[i].checked)
			{
				// un élément est checké >> je masque le message d'erreur et je quitte la fonction : 
				$("#txtErreur" + groupName).addClass("masque");
                                $("#txtErreur" + groupName).removeClass("visible");
				return;				
			};
	};

	// si j'ai parcourru tous les radio buttons et que je n'ai pas quitté la fonction,
	// alors c'est qu'aucun radio button n'est checké :			
	$("#txtErreur" + groupName).addClass("erreur visible");
        $("#txtErreur" + groupName).removeClass("masque");
	estFormulaireValide = false;
};


function verifierEgalite(idElement1, idElement2)
{
	if ($("#" + idElement1 + "").val() != $("#" + idElement2 + "").val())
	{
		// je met le flag de vérification du formulaire à false :
		estFormulaireValide = false;
		// habillage de la zone de texte en mode erreur (rouge)
		$("#" + idElement2 + "").addClass("erreur");
		// je quitte la fonction :
		return;		
	};
	$("#" + idElement2 + "").removeClass("erreur");	
};

function verifierFormat(idElement, pattern)
{
	var re = new RegExp(pattern);

	if (! re.test($("#" + idElement + "").val()))
	{
		// je met le flag de vérification du formulaire à false :
		estFormulaireValide = false;
		// habillage de la zone de texte en mode erreur (rouge)
		$("#" + idElement + "").addClass("erreur");
		// je quitte la fonction :
		return;		
	};
	$("#" + idElement + "").removeClass("erreur");	
		
};

function validitePassword(idElement)
{
	if ($("#" + idElement + "").val().length < 8 || $("#" + idElement + "").val().length > 40 )
	{
		// je met le flag de vérification du formulaire à false :
		estFormulaireValide = false;
		// habillage de la zone de texte en mode erreur (rouge)
		$("#" + idElement + "").addClass("erreur");
		// je quitte la fonction :
		return;		
	};
	$("#" + idElement + "").removeClass("erreur");	
		
};

function validiteChamp(idElement)
{
	if ($("#" + idElement + "").val().length > 40)
	{
		// je met le flag de vérification du formulaire à false :
		estFormulaireValide = false;
		// habillage de la zone de texte en mode erreur (rouge)
		$("#" + idElement + "").addClass("erreur");
		// je quitte la fonction :
		return;		
	};
	$("#" + idElement + "").removeClass("erreur");	
		
};

function verifierCheckbox(idElement)
{
	if (! $("#" + idElement + "").checked)
	{
		// l'élément n'est pas checké >> j'affiche le message d'erreur et je quitte la fonction : 
		$("#" + idElement + "Erreur").addClass("erreur visible");
		estFormulaireValide = false;
		return;				
	};

	$("#" + idElement + "Erreur").addClass("masque");		
	
};

function validerFormulaireInscription()
{
	// au début de la validation, j'initialise le flag à true 
	// (au départ, on considère que le formulaire est valide)
	estFormulaireValide = true;
        
        if($(".zoneInscription").length != 0)
        {
            if (window.localStorage.getItem($("#newLogin").val()) != null)
            {
                estFormulaireValide = false;
                $("#inscriptionCompte p:first").append("<p class='erreur'>Ce login existe déjà</p>")
                return estFormulaireValide;
            }
            else
            {
                estRempli("newLogin");
                validitePassword("newLogin");
                estRempli("newPassword");
                validitePassword("newPassword");

                var contenuLogin = $("#newLogin").val();
                var contenuPassword = $("#newPassword").val();

                localStorage.setItem("loginStorage", contenuLogin);
                localStorage.setItem("passwordStorage", contenuPassword);

                return estFormulaireValide;
            }
        }
        else
        {
            
            verifierRadioButton("newCivilite");
            estRempli("newPrenom");
            validiteChamp("newPrenom");
            verifierFormat("newPrenom", patternSansChiffre);
            estRempli("newNom");
            validiteChamp("newNom");
            verifierFormat("newNom", patternSansChiffre);
            estRempli("newAdresse");
            estRempli("newCodePostal");
            verifierFormat("newCodePostal", patternCodePostal);
            estRempli("newVille");
            validiteChamp("newVille");
            /*verifierFormat("newVille", patternSansChiffre);*/
            estRempli("newMail");
            verifierFormat("newMail", patternEmail);
            estRempli("confirmeNewMail");
            verifierEgalite("newMail", "confirmeNewMail");
            estRempli("newLogin");
            validiteChamp("newLogin");
            estRempli("newPassword");
            validitePassword("newPassword");
            estRempli("confirmeNewPassword");
            verifierEgalite("newPassword", "confirmeNewPassword");
            
            if (estFormulaireValide === true)
            {
                enregistrerUtilisateur();
                return estFormulaireValide;
                
            }
            else
            {
                return estFormulaireValide;
            };
            
        };
	
};

function enregistrerUtilisateur()
{
    var civilite = $("#newCivilite").val();
    var prenom = $("#newPrenom").val();
    var nom = $("#newNom").val();
    var adresse = $("#newAdresse").val();
    var codePostal = $("#newCodePostal").val();
    var ville = $("#newVille").val();
    var mail = $("#newMail").val();
    var login = $("#newLogin").val();
    var password = $("#newPassword").val();
    
    var utilisateur = {
    civilite : civilite,
    nom : nom,
    prenom : prenom,
    adresse : adresse,
    codePostal : codePostal,
    ville : ville,
    mail : mail,
    login : login,
    password : password
    };
    
    var key = login;
    
    
    var val = JSON.stringify(utilisateur);
    window.localStorage.setItem(key, val);
    window.localStorage.setItem("connexionOK", key);
    /*JSON.parse(window.localStorage.getItem("fguillet"));*/
        
};