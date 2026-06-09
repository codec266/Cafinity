# ☕ Cafinity

Software Engineering 2 Mobile Application Project
___
## Tech Stack

* **Framework:** React Native + Expo (SDK 54)
* **Routing:** Expo Router
* **Styling:** NativeWind v4 (Tailwind CSS)
* **State Management:** Zustand
* **Icons:** Expo Vector Icons (Feather)

---

## Development

Follow these steps to get the app running on your local machine.

### 1. Prerequisites
* Install [Node.js](https://nodejs.org/) (LTS version recommended).
* Download the **Expo Go** app on your physical iOS or Android device.

### 2. Installation
Clone the repository and install the core dependencies.

Note: Because this project is strictly pinned to Expo SDK 54 for native compatibility, you must bypass NPM's strict peer dependency checks and manually add the Fast Refresh compiler.

```bash
git clone https://github.com/codec266/Cafinity
cd Cafinity
npm install --legacy-peer-deps
npm install react-refresh --save-dev
```

### 3. Environment Setup
This app uses a secure Supabase backend. You must set up your local environment variables before booting the app.

1. Create a new file named exactly .env in the root folder of the project.
2. Reach out to the repository admin for the database keys, and add them to the file like this:

```
EXPO_PUBLIC_SUPABASE_URL=actual_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=actual_anon_key_here
```

### 4. Running the App
```bash
npx expo start -c
```
*Note*: `-c` flag is used to clear the Metro bundler cache.