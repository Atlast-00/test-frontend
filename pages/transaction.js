import { useEffect, useState } from 'react';
import Layout from '../components/layout'
import Link from 'next/link'
import { getTransaction, addTransaction } from '../apis/transactionApi'

const index = () => {
  const [reload, setReload] = useState(true)
  const [transaction, setTransaction] = useState([])
  const [summary, setSummary] = useState([])
  const [formData, setFormData] = useState({
    sourceAccount: '',
  })

  const handleInputChange = (e) => {
    const { target } = e

    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }

  const disabledButton = () => {
    return !(
      formData.sourceAccount
    )
  }

  const submitForm = () => {
    getTransaction({
      srcAccount: formData.sourceAccount
    })
      .then(res => {
        setTransaction(res[0])
        setSummary(res[1])
      })
  }

  const toDateTime = (timestamp) => {
    return new Date(timestamp).toJSON();
  }

  useEffect(() => {
    if (reload) {
      getTransaction({})
        .then(res => {
          setTransaction(res[0])
          setReload(false);
        })
    }
  }, [])

  return (
    <Layout>

      <div className="row">
        <div className="col-12 mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Transfer Query</h5>

              <div className="mb-3">
                <label htmlFor="sourceAccount" className="form-label">Account</label>
                <input type="text" className="form-control" name="sourceAccount" id="sourceAccount" onChange={handleInputChange} value={formData.sourceAccount} />
              </div>

              <button type="submit" onClick={submitForm} className="btn btn-primary mb-3" >Query</button>
            </div>
          </div>
        </div>

        {
          summary.length > 0 &&
          <div className="col-12 mt-3 " >
            <h6>Debt Summary</h6>

            <div className="card mb-3">
              <div className="card-body">
                {summary.map((v, i) => (
                  <div key={i}>
                    <p> {v.dst} <span className="float-end">฿ {v.total} </span> </p>
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        }

        <div className="col-12 mt-3 mb-3">
          <h6><span>Transaction </span> </h6>
          <ul className="list-group">
            {
              transaction.length > 0 &&
              transaction.map(data => (
                <li className="list-group-item" key={data.timestamp}>
                  <h6>{data.src} {data.type} {data.dst}</h6>
                  <p> <span className="float-start"> {toDateTime(data.timestamp)} </span><span className="float-end">฿ {data.total}</span></p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default index;