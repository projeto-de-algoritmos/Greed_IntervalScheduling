import './styles/MyGrid.css'
import Item from './Item';


const MyGrid = (props) => {

  const handleWidthChange = ({ id, width }) => {
    const newInterval = props.intervalData[id]
    newInterval.width = width
    props.onDataChange({id, newInterval})
  };
  
  const handleXChange = ({ id, x }) => {
    const newInterval = props.intervalData[id]
    newInterval.x = x
    props.onDataChange({id, newInterval})
  };

  return (
    <div>
      <div className="plaid"
        style={{
          height: `${props.numberOfLines*80}px`
        }}
      >
        {Object.entries(props.intervalData).map(([key, item]) => (
          <Item
            key={key}
            id={parseInt(key)}
            width={item.width}
            color={item.color}
            x={item.x}
            onWidthChange={handleWidthChange}
            onXChange={handleXChange}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGrid;
