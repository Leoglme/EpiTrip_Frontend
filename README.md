# EpiTrip - FrontEnd

## 🛠 Tech Stack

- TypeScript (Language)
- Nuxt (Framework)
- CI / CD (Github Actions)
- Docker / DockerCompose (Develop)
- Kubernetes (Prod and Staging)

<br /><br /><br /><br />

## 📚 WebSite

- Production : https://epi-trip.crzcommon.com
- Staging : https://staging.epi-trip.crzcommon.com

<br /><br /><br /><br />

## ⚙️ Setup Environment Development

1. Clone the project repository using the following commands :

```bash
git clone git@github.com:Leoglme/EpiTrip_Frontend.git
```

2. Steps by Platform :

```bash
# Windows :
1. Requirements : Windows >= 10
2. Download and Install WSL2 : https://learn.microsoft.com/fr-fr/windows/wsl/install
3. Download and Install Docker Desktop : https://docs.docker.com/desktop/install/windows-install/

# Unix :
1. Requirements : macOS or Linux
2. Download and Install Docker
```

<br /><br /><br /><br />

## 🔄 Cycle Development

1. Open Docker Desktop
2. Run command :

```bash
   # Start the development server on http://localhost:3000 (Nuxt)

   docker-compose up
```

<br /><br /><br /><br />

## 🚀 Production

### ⚙️➡️ Automatic Distribution Process (CI / CD)

#### Si c'est un nouveau projet suivez les instruction :

1. Ajoutées les SECRETS_GITHUB pour :
   - DOCKER_HUB_USERNAME
   - DOCKER_HUB_ACCESS_TOKEN
   - KUBECONFIG
   - PAT (crée un nouveau token si besoin sur le site de github puis dans le menu du "Profil" puis -> "Settings" -> "Developper Settings' -> 'Personnal Access Tokens' -> Tokens (classic))
