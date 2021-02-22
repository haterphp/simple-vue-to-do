
const DB = {
    get: (name) => JSON.parse(localStorage.getItem(name)),
    set: (name, value) => localStorage.setItem(name, JSON.stringify(value))
}

const Store = {
    states: {
        notes: DB.get('notes') || []
    },
    methods: {
        createNote(obj){
            this.states.notes.unshift(obj);
            DB.set('notes', this.states.notes);
        }
    }
}

const CreateNoteInput = {
    template: `
        <div class="container">
            <div class="wrap mt-5 d-flex justify-content-center">
                <form class="w-50 border rounded" @submit.prevent="appendNote()">
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-control form-control-noborder form-control-large note-form-input" 
                            placeholder="Начинайте вводить заметку..." 
                            v-model="note">
                    </div>
                    <!-- <div class="form-group props-container">
                        <div class="form-group form-props">

                        </div>
                    </div> -->
                    <div class="form-group nav-note-container justify-content-between" style="display: none;">
                        <div class="nav">
                            <div class="nav-item btn nav-note-a">
                                <a href="#">
                                    <i class="fa fa-check-square"></i> 
                                </a>
                            </div>
                            <div class="nav-item btn nav-note-a">
                                <a href="#">
                                    <i class="fa fa-palette"></i> 
                                </a>
                            </div>
                        </div>
                        <button class="btn btn-outline-dark btn-sm">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    mounted(){
        const $input = this.$el.querySelector('.note-form-input');

        $input.addEventListener('focus', () => (this.$el.querySelector('.nav-note-container ').style.display = 'flex'));
        $input.addEventListener('blur', () => this.closeInput());
    },
    data: function() {
        return {
            note: '',
            props: []
        }
    },
    methods: {
        async appendNote(){
            const { note, props } = this;
            const body = { note, props};
            const store = Store.methods.createNote.bind(Store, body);
            await store();

            this.note = '';
            this.closeInput();
            
            // place to emit fuction
        },
        closeInput(){

            const $input = this.$el.querySelector('.note-form-input');
            $input.blur();

            if(this.note === "")
                this.$el.querySelector('.nav-note-container ').style.display = 'none'
        }
    }
}

const NoteContainer = {
    template: `
        <div class="d-flex justify-content-center">
            <h4 class="text-muted">Здесь будут ваши заметки</h4>
        </div>
    `
}

const App = {
    template: `
        <div class="header">
            <create-note-input></create-note-input>
        </div>
        <div class="container">
            <div class="wrap mt-5 mb-5">
                <note-container></note-container>
            </div>
        </div>
    `,
    components: { CreateNoteInput, NoteContainer }
};

const app = Vue.createApp(App).mount('#app');