import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home = () => (
  <div>
    {/* <Navbar /> */}

    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Bienvenue sur le système de gestion vétérinaire</h1>
    </div>

    {/* BANNIÈRE VÉTÉRINAIRE */}
    <section
      style={{
        backgroundImage: "url('/images/veterinaire.jpg')", // Assure-toi que le fichier est dans /public/images/
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "90px 30px",
        textAlign: "center"
      }}
    >
      <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Un Soin de Qualité pour Vos Animaux</h2>
      <p style={{ fontSize: "1.2rem" }}>
        Notre équipe vétérinaire veille au bien-être de vos compagnons avec passion et professionnalisme.
      </p>
    </section>

    {/* SECTION "COMMENT ÇA MARCHE" */}
    <section style={{ padding: "60px 20px", backgroundColor: "#f8f9fa" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2>Comment ça marche ?</h2>
        <p>Notre système vous permet de gérer les données vétérinaires avec facilité :</p>
      </div>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px"
      }}>
        {[
          { icon: "📝", title: "Créer", desc: "Ajoutez un nouvel animal, un rendez-vous ou une fiche médicale." },
          { icon: "📖", title: "Lire", desc: "Consultez les informations des patients et leurs historiques." },
          { icon: "✏️", title: "Mettre à jour", desc: "Modifiez les données facilement et rapidement." },
          { icon: "🗑", title: "Supprimer", desc: "Supprimez les fiches inutiles ou erronées." }
        ].map((item, index) => (
          <div key={index} style={{
            flex: "1",
            minWidth: "250px",
            maxWidth: "300px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <h3>{item.icon} {item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* <Footer /> */}
  </div>
);

export default Home;
