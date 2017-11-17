import { Vue, Component } from 'vue-property-decorator'
import Example from 'Components/example'

@Component({
  components: {
    Example,
  },
})
class App extends Vue { }

export default App
