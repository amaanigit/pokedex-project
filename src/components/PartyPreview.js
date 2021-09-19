import '../styles/PartyPreview.css';
import defaultImg from '../assets/card-pokeball.svg';

function PartyPreview(props) {
    function displayDefaultImage() {
        const objs = []
        for (var i=0; i < (props.maxParty - props.partyList.length); i++) {
            objs.push(<div  key={'default-' + i} className="default-image-wrapper"><img className='pokemon-image default-image' src={defaultImg} alt='no pokemon'/></div>)
        }
        return objs;
    }

    return (
        <div className="party-preview">
            {props.partyList.map((item) => {
                return (
                    <img key={item.id} className='pokemon-image' src={item.sprite} alt='pokemon pic from API'/>
                );
            })}
            {displayDefaultImage()}
        </div>
    )
}

export default PartyPreview;