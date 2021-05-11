function connexionCompte ()
{
    var connexionValide = true;
    var valLogin = $("#champLogin").val();
    var valPassword = $("#champPassword").val();
    
    if ( window.localStorage.getItem(valLogin) != null )
    {
        var cleUtilisateur = JSON.parse(window.localStorage.getItem(valLogin));
        window.localStorage.removeItem("connexionOK");
        
        if (valPassword === cleUtilisateur.password)
        {
            connexionValide = true;
            window.localStorage.setItem("connexionOK", valLogin);
            
            return connexionValide;
        }
        else
        {
            connexionValide = false;
            
            return connexionValide;
        };
    }
    else
    {
        connexionValide = false;

        return connexionValide;
    };
   
};

function verifierConnecter ()
{
    var utilisateurConnecte = window.localStorage.getItem("connexionOK");

    if (utilisateurConnecte != null)
    {
        var cleUtilisateur = JSON.parse(window.localStorage.getItem(utilisateurConnecte));
        console.log(cleUtilisateur.prenom);

        $(".widgetConnecter").append("<p>Bonjour " + cleUtilisateur.prenom + "</p><p><a href='#' onclick='deconnexionCompte();'>Deconnexion</a>")    
        $(".widgetConnecter").removeClass("masque");
        $(".widgetConnecter").addClass("visible");
    }
    else
    {
        $(".widgetConnecter").removeClass("visible");
        $(".widgetConnecter").addClass("masque");
        $(".btCompte").removeAttr("href");
        $(".btCompte").attr("href", "login.html");
        
    };
};

function deconnexionCompte()
{
    window.localStorage.removeItem("connexionOK");
    verifierConnecter ();
    return false;
}
