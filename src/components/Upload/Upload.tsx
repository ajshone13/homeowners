import Papa from 'papaparse';
import { useState } from 'react';

const Upload = ({ people, setPeople }: any) => {
  const person: any = [];
  const [error, setError] = useState(false);

  const trimNameAndRemoveDots = ( name: string ) => {
    return name.trim().replace(/\./g, "");
  }

  const createObj = ( names: any ) => {
    names.forEach(( name: any, index:any ) => {   
      const trimmedName = trimNameAndRemoveDots(name);
      const nextTrimmedName = names[index + 1] ? trimNameAndRemoveDots(names[index + 1]) : null;
      const initial = trimmedName.split(' ').length >= 3 ? ( trimmedName.split(' ')[1].length <= 2 ? trimmedName.split(' ')[1] : '' ) : '';

      if ( trimmedName === 'Mr' || trimmedName === 'Mrs' || trimmedName === 'Dr' ) {
        person.push({
          title: trimmedName,
          firstName: nextTrimmedName!.split(' ').length >= 3 && !initial ? nextTrimmedName!.split(' ')[1] : '',
          initial: initial ? initial : '',
          lastName: nextTrimmedName!.split(' ').length >= 3 ? nextTrimmedName!.split(' ')[2] : nextTrimmedName!.split(" ")[1]
        });
      } else {
        person.push({
          title: trimmedName.split(' ')[0],
          firstName: trimmedName.split(' ').length >= 3 && !initial ? trimmedName.split(' ')[1] : '',
          initial: initial ? initial : '',
          lastName: trimmedName.split(' ').length >= 3 ? trimmedName.split(' ')[2] : trimmedName.split(' ')[1]
        });
      }
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const file = e.target[0].files[0] ? e.target[0].files[0] : setError(true);

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setError(false);
        results.data.map(( row: any ) => {
          const homeowner = row.homeowner;

          if ( homeowner.includes('&') || homeowner.includes('and') ) {
            return createObj(homeowner.split('and').join('&').split('&'));
          } else {
            return createObj(Array.of(homeowner));
          }
        });
        setPeople(person);
      }
    });
  }

  return (
    <main className="homeowners__upload">
      <h1>CSV Upload</h1>
      <form className={`homeowners__upload-form ${ error ? 'homeowners__upload-form--error' : '' }`} onSubmit={handleSubmit}>
        <input
          className="homeowners__upload-form__input"
          type="file"
          name="file"
          accept=".csv"
        />
        <button className="homeowners__upload-form__button">Upload</button>
      </form>
    </main>
  )
}

export default Upload;