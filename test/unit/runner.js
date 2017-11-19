import * as Jasmine from 'jasmine'
import { SpecReporter } from 'jasmine-spec-reporter'

const jasmine = new Jasmine({})
const specReporter = new SpecReporter({
  spec: {
    displayPending: true,
  },
})

jasmine.env.clearReporters()
jasmine.env.addReporter(specReporter)
jasmine.loadConfigFile('./test/unit/jasmine.json')
jasmine.execute()
