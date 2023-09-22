## Instalación 
Instalar dependencias del proyecto

```
npm install
```

Hacer un web deploy en localhost

```
// Sin Ionic CLI
npm run start

// Con Ionic CLI
ionic serve
```

## Build
Hacer build para la versión web

```
// Sin Ionic CLI
npm run build

// Se genera la carpeta /www en la raiz del proyecto
```

Construir una apk debug para android (Se necesita [Android SDK](https://developer.android.com/studio/))
```
// Con Ionic CLI
ionic capacitor build android
```  

## Consideraciones
Para editar las urls de las apis editar el siguiente archivo

```
// src\environments\environment.ts
// src\environments\environment.prod.ts

export const environment = {
	production: true,
	apiUrl: "",
	socketUrl: ""
};
```