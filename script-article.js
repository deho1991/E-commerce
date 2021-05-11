function article (nom, id, image, description, prix, categorie, motCle)
{
    this.nom = nom;
    this.id = id;
    this.image = image;
    this.description = description;
    this.prix = prix;
    this.categorie = categorie;
    this.motCle = motCle;
      
}

listeArticle = [
    new article("Television 01", "tv0001", "tv0001", "Description Television 01", 150, "tv", "ecran, plat, tv, television, petit" ),
    new article("Television 02", "tv0002", "tv0002", "Description Television 02", 239,99, "tv", "ecran, plat, tv, television, moyen"),
    new article("Television 03", "tv0003", "tv0003", "Description Television 03", 280, "tv",  "ecran, plat, tv, television, grand"),
    new article("Lecteur Blu Ray 01", "lt0001", "lt0001", "Description Lecteur Blu Ray 01", 102,88, "lecteur", "lecteur, blu, ray, video, petit" ),
    new article("Lecteur Blu Ray 02", "lt0002", "lt0002", "Description Lecteur Blu Ray 02", 365, "lecteur", "lecteur, blu, ray, video, moyen"),
    new article("Lecteur Blu Ray 03", "lt0003", "lt0003", "Description Lecteur Blu Ray 03", 404, "lecteur", "lecteur, blu, ray, video, grand")
];