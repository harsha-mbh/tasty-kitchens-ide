import {MdOutlineSort} from 'react-icons/md'
import './index.css'

const FiltersGroup = props => {
  const {sortItemId, sortByOptions} = props
  const onChangeSortby = event => {
    const {changeSortItemId} = props
    changeSortItemId(event.target.value)
  }
  return (
    <div className="filters-group-container">
      <h1 className="heading">Popular Restaurants</h1>
      <div className="filter-description-container">
        <p className="description">
          Select Your favorite restaurant special dish and make your day
          happy...
        </p>
        <div className="filter-options-container">
          <MdOutlineSort width={24} height={24} />
          <p className="sort-by">Sort by</p>
          <select
            className="sort-by-select"
            value={sortItemId}
            onChange={onChangeSortby}
          >
            {sortByOptions.map(eachOption => (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default FiltersGroup
