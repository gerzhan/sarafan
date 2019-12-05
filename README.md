# Учебный проект - "Sarafan"

[https://github.com/gerzhan/sarafan](https://github.com/gerzhan/sarafan)

> [Видео курс - "Spring Boot Rest + Vue.js"](https://www.youtube.com/playlist?list=PLU2ftbIeotGqSTOVNjT4L3Yfy8jatCdhm)

> Начальный набор кода сгенерирован на [start.spring.io](https://start.spring.io/#!type=maven-project&language=java&platformVersion=2.2.1.RELEASE&packaging=jar&jvmVersion=1.8&groupId=ru.helpcontrol.sanbox&artifactId=sarafan&name=Sarafan&description=Demo%20project%20for%20Spring%20Boot%20&packageName=ru.helpcontrol.sanbox.sarafan&dependencies=web,devtools)

> Использована H2 Database ()

## Start server

```shell script
$mvn spring-boot:run
```

## Access to H2 Database

By default - [http://localhost:8080/h2-console/](http://localhost:8080/h2-console/)

## Browser console test operations API call

```shell script
// GET all
fetch('/messages/').then(response => response.json().then(console.log))

// GET one
fetch('/messages/2').then(response => response.json().then(console.log))

// POST add new one
fetch(
  '/messages',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'Fourth message (4)', id: 10 })
  }
).then(result => result.json().then(console.log))

// PUT save existing
fetch(
  '/messages/4',
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'Fourth message', id: 10 })
  }
).then(result => result.json().then(console.log));

// DELETE existing
fetch('/messages/4', { method: 'DELETE' }).then(result => console.log(result))
```

## Web Client - Single Page Application

### Dependencies

* [vuejs (v2)](https://vuejs.org/)
* [vue-resource](https://github.com/pagekit/vue-resource)
* [vuematerial.io](https://vuematerial.io/)