import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { IOption } from "../interface/IOption";
import saw from "../helper/simple-additive-weighting";

const tempatTinggal: IOption[] = [
  { value: 1, label: "Milik Sendiri" },
  { value: 2, label: "Milik Orang Tua" },
  { value: 3, label: "Kos" },
  { value: 4, label: "Kontrak" },
  { value: 5, label: "Tidak Ada" },
];

const pekerjaan: IOption[] = [
  { value: 1, label: "Wiraswasta" },
  { value: 2, label: "Petani" },
  { value: 3, label: "Pedagang" },
  { value: 4, label: "Buruh" },
  { value: 5, label: "Tidak Bekerja" },
];

const tanggungan: IOption[] = [
  { value: 1, label: "Tidak Ada" },
  { value: 2, label: "1 / 2 orang" },
  { value: 3, label: "3 / 4 orang" },
  { value: 4, label: "5 / 6 orang" },
  { value: 5, label: "Lebih dari 6 orang" },
];

const pendapatan: IOption[] = [
  { value: 1, label: "<Rp. 1.000.000" },
  { value: 2, label: "Rp. 1.000.000 - Rp. 3.000.000" },
  { value: 3, label: "Rp. 3.000.000 - Rp. 4.000.000" },
  { value: 4, label: "Rp. 4.000.000 - Rp. 5.000.000" },
  { value: 5, label: ">Rp. 5.000.000" },
];

const pengeluaran: IOption[] = [
  { value: 1, label: "<Rp. 1.000.000" },
  { value: 2, label: "Rp. 1.000.000 - Rp. 3.000.000" },
  { value: 3, label: "Rp. 3.000.000 - Rp. 4.000.000" },
  { value: 4, label: "Rp. 4.000.000 - Rp. 5.000.000" },
  { value: 5, label: ">Rp. 5.000.000" },
];

const Home: NextPage = () => {
  const [formValue, setFormValue] = useState<any>([
    {
      nama: "Orang",
      tempatTinggal: 1,
      pekerjaan: 1,
      tanggungan: 1,
      pendapatan: 1,
      pengeluaran: 1,
    },
  ]);

  const [sawValue, setSawValue] = useState<any>("");

  const handleChange = (i: any, e: any) => {
    let newFormValue = [...formValue];
    if (e.target.name === "nama") {
      newFormValue[i][e.target.name] = e.target.value;
    } else {
      newFormValue[i][e.target.name] = Number(e.target.value);
    }
    setFormValue(newFormValue);
  };

  const removeFormFields = (i: any) => {
    let newFormValue = [...formValue];
    newFormValue.splice(i, 1);
    setFormValue(newFormValue);
  };

  const addFormFields = () => {
    setFormValue([
      ...formValue,
      {
        nama: "Orang",
        tempatTinggal: 1,
        pekerjaan: 1,
        tanggungan: 1,
        pendapatan: 1,
        pengeluaran: 1,
      },
    ]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let sawCalculate = saw(formValue);

    setSawValue(sawCalculate);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Additive Weighting</title>
        <meta name="description" content="valenoirs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="center">
        <div className="container mx-auto p-6">
          <div className="row-auto"></div>
          <h1 className="text-center text-xl mb-5">
            Simple Additive Weighting
          </h1>
          <form
            className="form-control w-full max-w-xs"
            onSubmit={handleSubmit}
          >
            {formValue.map((element: any, index: any) => (
              <div key={index}>
                {/* <label className="label">
              <span className="label-text">Simple Additive Weighting</span>
            </label> */}
                <div className="input-group">
                  <label htmlFor="nama" className="input-group-vertical">
                    <span>Nama</span>
                    <input
                      type="text"
                      className="input w-[15rem] max-w-xs"
                      name="nama"
                      placeholder="Orang"
                      defaultValue={"Orang"}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </label>
                  <label>
                    <span>Tempat Tinggal</span>
                    <select
                      name="tempatTinggal"
                      className="select w-[15rem] max-w-xs"
                      onChange={(e) => handleChange(index, e)}
                    >
                      {tempatTinggal.map((e, i) => (
                        <option key={i} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Pekerjaan</span>
                    <select
                      name="pekerjaan"
                      className="select w-[15rem] max-w-xs"
                      onChange={(e) => handleChange(index, e)}
                    >
                      {pekerjaan.map((e, i) => (
                        <option key={i} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Tanggungan</span>
                    <select
                      name="tanggungan"
                      className="select w-[15rem] max-w-xs"
                      onChange={(e) => handleChange(index, e)}
                    >
                      {tanggungan.map((e, i) => (
                        <option key={i} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Pendapatan</span>
                    <select
                      name="pendapatan"
                      className="select w-[15rem] max-w-xs"
                      onChange={(e) => handleChange(index, e)}
                    >
                      {pendapatan.map((e, i) => (
                        <option key={i} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Pengeluaran</span>
                    <select
                      name="pengeluaran"
                      className="select w-[15rem] max-w-xs"
                      onChange={(e) => handleChange(index, e)}
                    >
                      {pengeluaran.map((e, i) => (
                        <option key={i} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  {index ? (
                    <button
                      type="button"
                      className="btn btn-error"
                      onClick={() => removeFormFields(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            <div className="btn-group mt-10">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => addFormFields()}
              >
                Add
              </button>
              <button className="btn btn-accent" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="container mx-auto p-6">
          {sawValue && (
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
                    {sawValue.map((e: any, i: any) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{e.name}</td>
                        <td>{e.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
