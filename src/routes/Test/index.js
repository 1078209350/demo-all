import LowCodeComponent from '../../components/lowCode/LowCodeComponent';
import { LowCode, service } from '../../components/lowCode/utils';
import TestService from './service';

@LowCode('TTTTTT')
export default class Test extends LowCodeComponent {
  constructor(props) {
    super(props);
    window.eventsPool = this.eventsPool;
  }

  @service
  basic() {
    return new TestService(this.pageStore);
  }
}
