// @see https://vuematerial.io/getting-started
Vue.use(VueMaterial.default);
// NOTE: компонент "пункт списка сообщений"
Vue.component('message-list-item', {
  // NOTE: простой способ задания имен свойств для передачи данных в компонент
  props: [ 'message' ],
  template: `
  <md-list-item>
    <div class="md-list-item-text">
      <i>({{message.id}})</i> {{message.text}}
    </div>
  </md-list-item>
  `,
});

// NOTE: компонент "список сообщений"
Vue.component('message-list', {
  // NOTE: способ детализированного задания имен свойств для передачи данных в компонент
  props: {
    messages: {
      type: Array,
      default: []
    },
  },
  template: `
  <md-list>
    <md-subheader>Messages</md-subheader>
    <message-list-item
      v-for="item in messages"
      :message="item"
      :key="item.id"/>
  </md-list>
  `,
});
// @see https://github.com/pagekit/vue-resource/blob/develop/docs/resource.md#example
// NOTE: создание экземпляра resource выполняем не в контексте Vue, поэтому не используем "this.resource"
var messageApi = Vue.resource('messages{/id}');
// NOTE: компонент приложения
new Vue({
  el: '#app',
  template: `
  <div>
    <h1>{{AppName}}</h1>
    <message-list messages :messages="messages"></message-list>
  </div>
  `,
  data: {
    AppName: 'SaraFan',
    messages: [],
  },
  // NOTE: метод "жизненного цикла" компонента
  created: function () {
    // NOTE: запрос данных с сервера
    messageApi
      // NOTE: метод  "get" без параметров возвражает все записи
      .get()
      // NOTE: получаем и преобразуем ответ сервера в JSON
      .then((response) => response.json())
      // NOTE: в существующее свойство компонента помещаем новые данные
      .then(data => data.map(item => this.messages.push(item)));
  }
});
