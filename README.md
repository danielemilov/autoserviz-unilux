# Автосервиз Унилукс

Лек React/Vite frontend. Записването на час е интерактивен 4-step процес:

1. услуга;
2. автомобил;
3. предпочитан ден и час;
4. контакти и преглед на заявката.

Визуализацията на Visa, Mastercard, Apple Pay и Google Pay означава единствено **плащане на място след услугата**. Няма checkout, платежен provider или събиране на картови данни.

## Стартиране локално

```bash
cd /Users/danielemilov/autoserviz-unilux
npm run dev
```

После отвори [http://localhost:5173](http://localhost:5173).

Vite стартира сайта на порт `5173`. За спиране натисни `Ctrl + C` в същия Terminal прозорец.

## Web3Forms

В `client/src/config/site.js` добави Web3Forms access key в `web3FormsAccessKey`. Формата ще изпраща заявката директно до избрания получател, без backend.

## Данни, които остават за добавяне

- Web3Forms access key;
- временният адрес в сайта е `с. Ушинци, България` — смени `address`, `mapsEmbedUrl` и `mapsDirectionsUrl` в `client/src/config/site.js`, когато имаш точния адрес.
