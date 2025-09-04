import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentChange = event => {
    setPaymentMethod(event.target.value)
  }

  const handleConfirmOrder = () => {
    setOrderPlaced(true)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>

              {/* ✅ Single Responsive Popup Button */}
              <Popup
                modal
                className="popup-content"
                trigger={
                  <button
                    type="button"
                    className="checkout-button responsive-checkout"
                  >
                    Checkout
                  </button>
                }
              >
                {close => (
                  <div>
                    {orderPlaced ? (
                      <div className="success-message">
                        <h3>Your order has been placed successfully</h3>
                      </div>
                    ) : (
                      <>
                        <h2>Select Payment Method</h2>
                        <form className="payment-form">
                          <label>
                            <input
                              type="radio"
                              value="Card"
                              checked={paymentMethod === 'Card'}
                              onChange={handlePaymentChange}
                              disabled
                            />
                            Card
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="NetBanking"
                              checked={paymentMethod === 'NetBanking'}
                              onChange={handlePaymentChange}
                              disabled
                            />
                            Net Banking
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="UPI"
                              checked={paymentMethod === 'UPI'}
                              onChange={handlePaymentChange}
                              disabled
                            />
                            UPI
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="Wallet"
                              checked={paymentMethod === 'Wallet'}
                              onChange={handlePaymentChange}
                              disabled
                            />
                            Wallet
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="CashOnDelivery"
                              checked={paymentMethod === 'CashOnDelivery'}
                              onChange={handlePaymentChange}
                            />
                            Cash on Delivery
                          </label>
                        </form>

                        <div className="summary">
                          <p>Items: {cartList.length}</p>
                          <p>Total: Rs {total}/-</p>
                        </div>

                        <button
                          type="button"
                          className="confirm-order-button"
                          disabled={paymentMethod !== 'CashOnDelivery'}
                          onClick={handleConfirmOrder}
                        >
                          Confirm Order
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      className="close-button"
                      onClick={close}
                    >
                      Close
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
