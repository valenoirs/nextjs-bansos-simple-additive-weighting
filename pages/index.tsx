import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { IOption } from '../interface/option'
import saw from '../helper/simple-additive-weighting'

const penghasilan: IOption[] = [
  {value: 1, label: 'Rp. 2.000.000 - Rp. 1.500.000'},
  {value: 2, label: 'Rp. 1.500.000 - Rp. 1.000.000'},
  {value: 3, label: 'Rp. 1.000.000 - Rp. 500.000'},
  {value: 4, label: 'Rp. 500.000 - Rp. 0'},
]

const status: IOption[] = [
  {value: 1, label: 'Belum Kawin'},
  {value: 2, label: 'Kawin'},
  {value: 3, label: 'Cerai Hidup'},
  {value: 4, label: 'Cerai Mati'},
]

const tanggungan: IOption[] = [
  {value: 1, label: 'Tidak memiliki anak'},
  {value: 2, label: '1 / 2 anak'},
  {value: 3, label: '3 / 4 anak'},
  {value: 4, label: 'Lebih dari 5 anak'},
]

const umur: IOption[] = [
  {value: 1, label: '25-30 tahun'},
  {value: 2, label: '31-40 tahun'},
  {value: 3, label: '41-50 tahun'},
  {value: 4, label: 'Diatas 50 tahun'},
]

const Home: NextPage = () => {
  const [formValue, setFormValue] = useState<any>([{
    nama: 1,
    penghasilan: 1,
    status: 1,
    tanggungan: 1,
    umur: 1,
  }])

  const[sawValue, setSawValue] = useState<any>('')

  const handleChange = (i:any, e:any) => {
    let newFormValue = [...formValue]
    if(e.target.name === 'nama'){
      newFormValue[i][e.target.name] = e.target.value
    }
    else{
      newFormValue[i][e.target.name] = Number(e.target.value)
    }
    setFormValue(newFormValue)
  }

  const removeFormFields = (i: any) => {
    let newFormValue = [...formValue];
    newFormValue.splice(i, 1);
    setFormValue(newFormValue)
  }

  const addFormFields = () => {
    setFormValue([...formValue, {
      nama: 1,
      penghasilan: 1,
      status: 1,
      tanggungan: 1,
      umur: 1,
    }])
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    let sawCalculate = saw(formValue)

    setSawValue(sawCalculate)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Additive Weighting</title>
        <meta name="description" content="valenoirs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='center'>
        <div className="container mx-auto p-6">
          <div className="row-auto"></div>
          <form className='form-control w-full max-w-xs' onSubmit={handleSubmit}>
            {formValue.map((element: any, index: any) => (
            <div key={index}>
              
            <label className="label">
              <span className="label-text">Simple Additive Weighting</span>
            </label>
            <div className="input-group">
              <input type="text" className='input w-[15rem] max-w-xs' name="nama" placeholder='Nama' onChange={e => handleChange(index, e)} />
              <select name='penghasilan' defaultValue={1} className="select w-[15rem] max-w-xs" onChange={e => handleChange(index, e)}>
                <option disabled selected>Penghasilan</option>
                {penghasilan.map((e,i) => 
                  <option key={i} value={e.value}>{e.label}</option>
                )}
              </select>
              <select name='status' defaultValue={1} className="select w-[15rem] max-w-xs" onChange={e => handleChange(index, e)}>
                <option disabled selected>Status</option>
                {status.map((e,i) => 
                  <option key={i} value={e.value}>{e.label}</option>
                )}
              </select>
              <select name='tanggungan' defaultValue={1} className="select w-[15rem] max-w-xs" onChange={e => handleChange(index, e)}>
                <option disabled selected>Tanggungan</option>
                {tanggungan.map((e,i) => 
                  <option key={i} value={e.value}>{e.label}</option>
                )}
              </select>
              <select name='umur' defaultValue={1} className="select w-[15rem] max-w-xs" onChange={e => handleChange(index, e)}>
                <option disabled selected>Umur</option>
                {umur.map((e,i) => 
                  <option key={i} value={e.value}>{e.label}</option>
                )}
              </select>
            {index ? 
            <button type="button" className="btn btn-error" onClick={() => removeFormFields(index)}>
              Remove
            </button> :
            null
            }
            </div>
            </div>
            ))}
            <div className="btn-group mt-10">
              <button className="btn btn-success" type="button" onClick={() => addFormFields()}>
                Add
              </button>
              <button className='btn btn-accent' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="container mx-auto p-6">
            {sawValue && 
            <div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nama</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sawValue.map((e:any,i:any) => 
                    <tr key={i}>
                      <th>{i+1}</th>
                      <td>{e.name}</td>
                      <td>{e.score}</td>
                    </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            }
        </div>
      </main>
    </div>
  )
}

export default Home
