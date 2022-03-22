const People = ( { people } : any ) => {

  return (
    <>
      { people.length > 0 ? 
        <ul className="homeowners__list">
          { people.map(({ title, firstName, initial, lastName }: any , index: any) => (
            <>
              <li className="homeowners__list-item" data-index={index} key={index}>
                { (title ? title : '') + ' ' + (firstName ? firstName : '') + ' ' + (initial ? initial : '') + ' ' + (lastName ? lastName : '') }
              </li>
            </>
          ))}
        </ul>
      : null }
    </>
  )
}

export default People;