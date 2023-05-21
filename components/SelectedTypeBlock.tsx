import * as React from 'react';

const SelectedTypeBlock = ({ styles, type, selectedType, setSelectedType }) => {
  return (
    <div className={styles.type}>
      {type.map((typeItem, i) => <div className={typeItem === selectedType ? styles.typeItemActive : styles.typeItem} key={typeItem} onClick={() => setSelectedType(typeItem)}>{typeItem}</div>)}
    </div>
  );
}

export default SelectedTypeBlock;