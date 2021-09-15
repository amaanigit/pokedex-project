import '../styles/CardGrid.css';

function CardGrid(props) {
    return (
      <div className="card-grid">
        {props.children}
      </div>
    );
}
 
export default CardGrid;