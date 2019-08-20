import { createStackNavigator } from 'react-navigation'
import TomaAsistencia from './TomaAsistencia';
import ScanScreen from './ScanQRScreen';

export default createStackNavigator({
    TomaAsistencia,
    ScanScreen
},{headerMode: 'none'});