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

Versiones de Ionic y Angular con las que se trabajan
```
Ionic:

   Ionic CLI                     : 7.1.1 (C:\Users\felip\AppData\Roaming\nvm\v16.19.1\node_modules\@ionic\cli)
   Ionic Framework               : @ionic/angular 7.2.0
   @angular-devkit/build-angular : 16.1.4
   @angular-devkit/schematics    : 16.1.4
   @angular/cli                  : 16.1.4
   @ionic/angular-toolkit        : 9.0.0

Capacitor:

   Capacitor CLI      : 5.2.2
   @capacitor/android : not installed
   @capacitor/core    : 5.2.2
   @capacitor/ios     : not installed

Utility:

   cordova-res : not installed globally
   native-run  : 1.7.2

System:

   NodeJS : v16.19.1 (C:\Program Files\nodejs\node.exe)
   npm    : 8.19.3
   OS     : Windows 10
```