import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Mint from './Mint';

export default function Popups(){
return(
<div>
	<Popup trigger={<button> </button>}
	position="right center">
        <Mint/>
	</Popup>
</div>
)
}
