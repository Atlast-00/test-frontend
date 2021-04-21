import { useEffect, useState } from 'react';
import Layout from '../components/layout'
import Link from 'next/link'
import { getTransaction, addTransaction } from '../apis/transactionApi'

const index = () => {
  const [reload, setReload] = useState(true)
  const [transaction, setTransaction] = useState([])
  const [formData, setFormData] = useState({
    sourceAccount: '',
    destinationAccount: '',
    transactionType: 'borrow',
    total: ''
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
      formData.sourceAccount &&
      formData.destinationAccount &&
      formData.transactionType &&
      formData.total
    )
  }

  const submitForm = () => {
    addTransaction({
      srcAccount: formData.sourceAccount,
      desAccount: formData.destinationAccount,
      type: formData.transactionType,
      total: formData.total
    })

    setReload(true);
  }

  const toDateTime = (timestamp) => {
    return new Date(timestamp).toJSON();
  }

  useEffect(() => {
    if (reload) {
      getTransaction({ limit: 5 })
        .then(res => {
          setTransaction(res[0])
          setReload(false);
        })
    }
  }, [reload])

  return (
    <Layout>
      <div className="row">
        <div className="col-12 mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Transfer</h5>

              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="transactionType" id="inlineRadio1" value="borrow" onChange={handleInputChange} checked />
                  <label className="form-check-label" htmlFor="inlineRadio1">ฺBorrow</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="transactionType" id="inlineRadio2" value="payback" onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineRadio2">Payback</label>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="sourceAccount" className="form-label">Source Account</label>
                <input type="text" className="form-control" name="sourceAccount" id="sourceAccount" onChange={handleInputChange} value={formData.sourceAccount} />
              </div>
              <div className="mb-3">
                <label htmlFor="destinationAccount" className="form-label">Destination Account</label>
                <input type="text" className="form-control" name="destinationAccount" id="destinationAccount" onChange={handleInputChange} value={formData.destinationAccount} />
              </div>

              <div className="mb-3">
                <label htmlFor="total" className="form-label">Total</label>
                <input type="text" className="form-control" name="total" id="total" onChange={handleInputChange} value={formData.total} />
              </div>

              <button type="submit" onClick={submitForm} className="btn btn-primary mb-3" disabled={disabledButton()}>Submit</button>
            </div>
          </div>
        </div>

        <div className="col-12 mt-3 ">
          <h6><span>Transaction </span>
            <Link href="/transaction">
              <a>(see more)</a>
            </Link>
          </h6>

        </div>
        <div className="col-12 mb-3">
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