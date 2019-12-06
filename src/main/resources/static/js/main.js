// @see https://vuematerial.io/getting-started
Vue.use(VueMaterial.default);
// NOTE: компонент "форма ввода сообщения"
Vue.component('message-form', {
  props: ['messages', 'currentMessage'],
  template: `
  <div>
    <form @submit="onSubmit">
    <md-field>
      <label>Your message</label>
      <md-input v-model="textMessage"></md-input>
    </md-field>
    <md-button class="md-primary" type="submit" :disabled="textMessage.length==0">Send</md-button>
    </form>
  </div>
  `,
  data: function() {
    return {
      textMessage: '',
      id: null,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const text = this.textMessage;
      const id = this.id;
      // NOTE: переменная messageApi объявлена через var далее по коду.
      // NOTE: Можем использовать подобным образом т.к. при запуске происходит "поднятие переменных".
      // NOTE: Не будет работать если использовать let или const для объявления messageApi.
      if (id === null) {
        // NOTE: если id не задан - требуется добавить
        messageApi
          // NOTE: используем способ записи { text }, что равнозначно - { text: text }
          .save({}, { text })
          .then(result => result.json())
          .then(data => {
            this.messages.push(data);
          });
      } else {
        // NOTE: обновляем данные при наличии id
        messageApi
          // NOTE: используем способ записи { id }, что равнозначно - { id: id }
          .update({ id }, { text })
          .then(result => result.json())
          .then(data => {
            // NOTE: необходимо найти старые данные и заменить на новые
            const indexMessage = this.messages.findIndex(
              item => item.id === this.id,
            );
            this.messages.splice(indexMessage, 1, data);
          });
      }
      // по завершению действий удаляем данные из формы
      this.textMessage = '';
      this.id = null;
    },
  },
  watch: {
    currentMessage: function(newVal, oldVal) {
      this.id = newVal.id;
      this.textMessage = newVal.text;
    },
  },
});
// NOTE: компонент "пункт списка сообщений"
Vue.component('message-list-item', {
  // NOTE: простой способ задания имен свойств для передачи данных в компонент
  props: ['message', 'editMethod', 'deleteMethod'],
  template: `
  <md-list-item>
    <div class="md-list-item-text">
      <i>({{message.id}})</i> {{message.text}}
    </div>
    <md-button class="md-fab md-mini md-primary" @click="editItem">
      <md-icon>edit</md-icon>
    </md-button>
     <md-button class="md-fab md-mini md-accent" @click="deleteItem">
      <md-icon>delete_forever</md-icon>
    </md-button>
  </md-list-item>
  `,
  methods: {
    editItem: function () {
      this.editMethod(this.message);
    },
    deleteItem: function () {
      this.deleteMethod(this.message);
    }
  },
});

// NOTE: компонент "список сообщений"
Vue.component('message-list', {
  // NOTE: способ детализированного задания имен свойств для передачи данных в компонент
  props: {
    messages: {
      type: Array,
      default: [],
    },
    selectAction: {
      type: Function,
    },
  },
  template: `
  <md-list>
    <md-subheader>Messages</md-subheader>
    <message-form :messages="messages" :currentMessage="currentMessage"></message-form>
    <message-list-item
      v-for="item in messages"
      :message="item"
      :key="item.id"
      :editMethod="editMethod"
      :deleteMethod="deleteMethod"
      />
  </md-list>
  `,
  data: function() {
    return {
      currentMessage: null,
    };
  },
  methods: {
    editMethod: function(item) {
      this.currentMessage = item;
    },
    deleteMethod: function (item) {
      const {id} = item;
      messageApi.remove({id}).then(result => {
        if (result.ok) {
          this.messages.splice(this.messages.indexOf(this.message), 1);
        }
      });
    }
  },
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
    <message-list messages :messages="messages" :selectAction="selectedItem"></message-list>
  </div>
  `,
  data: {
    AppName: 'SaraFan',
    messages: [],
  },
  // NOTE: метод "жизненного цикла" компонента
  created: function() {
    // NOTE: запрос данных с сервера
    messageApi
      // NOTE: метод  "get" без параметров возвражает все записи
      .get()
      // NOTE: получаем и преобразуем ответ сервера в JSON
      .then(response => response.json())
      // NOTE: в существующее свойство компонента помещаем новые данные
      .then(data => data.map(item => this.messages.push(item)));
  },
  methods: {
    selectedItem: function(item) {
      this.currentMessage = item;
    },
  },
});
