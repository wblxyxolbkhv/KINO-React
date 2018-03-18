# KINO-React

## Как установить и начать работать с проектом

1) Установить nodejs, вместе с ним должен поставиться npm (node package manager);
2) Понизить верию npm из консоли коммандой "npm install -g npm@4";
3) Установить тулзу командой "npm install -g create-react-native-app";
4) Склонировать репозиторий в желаемую папку;
5) Установить SDK для Android, инструменты adb и fastboot, а так же драйвера на свой телефон (или эмулятор, если хотите дебажить на нем). В [статье](https://4idroid.com/adb-drivers-fastboot-install/) есть подробное пошаговое описание как это сделать:
6) Включить отладку по USB на устройстве (на эмуляторе не требуется);
7) Установить на телефон Expo из Play Market (App Store);
8) Подключить дейвайс по USB;
9) Проверить, подключился ли девайс в консоли командой "adb devices" (если команда не распознается, [здесь](https://www.4tablet-pc.net/reviews-a-articles/143-program-adb-installing-and-configuring-the-system-user.html) можно посмотреть как заставить ее запускаться;
10) Зайти в папку Kino в репозитории в консоли;
11) Командой "npm start" запустить отладку проекта;
12) Нажать "a";

В результате запускается приложение в режиме дебага.