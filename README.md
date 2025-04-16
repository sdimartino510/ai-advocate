# Love Never Fails - AI Advocate

## Table of Contents

1. [Project Overview](#project-overview)
2. [Team Directory](#team-directory)
3. [Technology Stack](#technology-stack)
4. [How to Run the Application](#how-to-run-the-application)

---

## Project Overview

**Love Never Fails** is developing *AI Advocate*, a mobile application designed to simplify California's legislative updates using artificial intelligence. The app will assist individuals, especially those who have experienced human or sexual trafficking, in understanding complex legal documents such as assembly and house bills. By offering AI-generated summaries that are accessible to people from all educational backgrounds, *AI Advocate* aims to empower users to engage with and advocate for the laws that affect them.

---

## Team Directory

- **Client**: Sergio DiMartino
- **Project Lead**: Varsha Saravanan
- **Team Mentor**: Zulal Aksaru
- **Project Manager**: Vaishnavi Josyula
- **Engineering Manager**: Kelly Yu
- **Engineers**: John Konaiahgari, Rachel Tsai, Kcee Landon, Nhan Ngo, Zarifa Ibrahimzada

---

## Technology Stack

- **Mobile App Framework**: React Native
- **Backend**: Azure Cosmos DB
- **AI Services**: Azure OpenAI API (for bill summaries), specifically GPT 4o Mini
- **Other APIS**: LegiScan (to retrieve bills)

---

## How to Run the Application

### Prerequisites

Before running the app, make sure you to follow these steps on your machine:


1. **Clone the repository**:

    ```bash
    git clone https://github.com/sdimartino510/ai-advocate
    cd ai-advocate
    ```

2. **Install Mise**
   
    For Windows:
    ```bash
    winget install jdx.mise
    ```
    
    For MacOS/Linux:
    ```bash
    curl https://mise.run | sh
    ```
    
3. **Activate Mise**
   
    For Windows Powershell:  
    ```bash
    $shimPath = "$env:USERPROFILE\AppData\Local\mise\shims"
    $currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    $newPath = $currentPath + ";" + $shimPath
    [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
    ```
    
    For MacOS Terminal:  
    ```bash
    echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc
    ```
    
    For Linux Bash/Windows Git Bash:
    ```bash
    echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
    ```
    
4. **Initialize Project**
   
   ```bash
   mise run init
   ```
   
5. **Expo Go (on your mobile phone)**
   
   For Android:
   ```bash
   https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www
   ```
   
   For iOS:
   ```bash
   https://itunes.apple.com/app/apple-store/id982107779
   ```
   
6. **Android Studio/Xcode**

   Android Studio:
   ```bash
   https://developer.android.com/studio
   ```

   Xcode:
   ```bash
   https://apps.apple.com/us/app/xcode/id497799835
   ```

### Running the App


1. Run the following command in the Terminal to run the backend:

    ```bash
    mise run backend
    ```

   
3. Run the following command in the Terminal to run the mobile app:

    ```bash
    mise run mobile_app
    ```

---
