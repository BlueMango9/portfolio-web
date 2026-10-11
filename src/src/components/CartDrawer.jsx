import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShieldCheck, Truck, ArrowRight, CheckCircle2, Tag } from "lucide-react";
import styles from "./CartDrawer.module.css";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  variant,
}) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("CRX-849201");
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });

  const rawSubtotal = cartItems.reduce((sum, item) => {
    const num = parseFloat(item.price.replace("$", ""));
    return sum + num * item.quantity;
  }, 0);

  const discountAmount = rawSubtotal * appliedDiscount;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "COREX10") {
      setAppliedDiscount(0.1);
      setPromoMessage("✓ 10% Audiophile discount applied!");
    } else {
      setPromoMessage("Invalid code. Try 'COREX10'");
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderNumber(`CRX-${Math.floor(100000 + Math.random() * 900000)}`);
      setCheckoutComplete(true);
    }, 1200);
  };

  const resetOrder = () => {
    setCheckoutComplete(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Container */}
          <motion.aside
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            aria-label="Shopping Cart Drawer"
          >
            {/* Header */}
            <div className={styles.drawerHeader}>
              <div className={styles.titleWrap}>
                <h3 className={styles.title}>Your Reserve Bag</h3>
                <span className={styles.badge} style={{ color: variant.accent, borderColor: `${variant.accent}40` }}>
                  COREX Direct
                </span>
              </div>
              <button onClick={onClose} className={styles.closeBtn} aria-label="Close cart">
                <X />
              </button>
            </div>

            {/* Shipping indicator */}
            <div className={styles.shippingBar}>
              <div className={styles.shippingText}>
                <Truck className={styles.truckIcon} />
                <span>Complimentary Express Worldwide Shipping Active</span>
              </div>
            </div>

            {/* Content area */}
            <div className={styles.content}>
              {checkoutComplete ? (
                <div className={styles.successState}>
                  <CheckCircle2 className={styles.successIcon} style={{ color: variant.accent }} />
                  <h4 className={styles.successTitle}>Reservation Confirmed!</h4>
                  <p className={styles.successDesc}>
                    Thank you, {formData.name || "Audiophile"}. Order <strong>#{orderNumber}</strong> has been registered.
                  </p>
                  <p className={styles.trackingInfo}>
                    Confirmation and tracking details have been sent to <strong>{formData.email || "your email"}</strong>.
                  </p>
                  <button onClick={resetOrder} className={styles.finishBtn} style={{ background: variant.accent }}>
                    Return to Showcase
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                  <p className={styles.emptyText}>Your reserve bag is currently empty.</p>
                  <button onClick={onClose} className={styles.exploreBtn} style={{ background: variant.accent }}>
                    Explore COREX Editions
                  </button>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className={styles.itemsList}>
                    {cartItems.map((item) => (
                      <div key={item.id} className={styles.itemCard}>
                        {/* Color indicator swatch */}
                        <div
                          className={styles.itemThumb}
                          style={{
                            borderColor: item.accent,
                            background: `radial-gradient(circle, ${item.accent}30 0%, #0e0e18 100%)`,
                          }}
                        >
                          <span className={styles.itemDot} style={{ background: item.accent }} />
                        </div>

                        <div className={styles.itemDetails}>
                          <div className={styles.itemTopRow}>
                            <h4 className={styles.itemName}>{item.name}</h4>
                            <span className={styles.itemPrice}>{item.price}</span>
                          </div>
                          <span className={styles.itemEdition}>{item.edition || "Flagship Model"}</span>

                          <div className={styles.quantityRow}>
                            <div className={styles.qtyControls}>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className={styles.qtyBtn}
                                aria-label="Decrease quantity"
                              >
                                <Minus className={styles.qtyIcon} />
                              </button>
                              <span className={styles.qtyNumber}>{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className={styles.qtyBtn}
                                aria-label="Increase quantity"
                              >
                                <Plus className={styles.qtyIcon} />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className={styles.removeBtn}
                              aria-label="Remove item"
                            >
                              <Trash2 className={styles.trashIcon} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className={styles.promoForm}>
                    <div className={styles.promoInputWrap}>
                      <Tag className={styles.tagIcon} />
                      <input
                        type="text"
                        placeholder="Promo code (try COREX10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className={styles.promoInput}
                      />
                      <button type="submit" className={styles.promoBtn}>
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p
                        className={styles.promoMsg}
                        style={{ color: appliedDiscount > 0 ? "#10B981" : "#EF4444" }}
                      >
                        {promoMessage}
                      </p>
                    )}
                  </form>

                  {/* Checkout Form */}
                  <form onSubmit={handleCheckoutSubmit} className={styles.checkoutForm}>
                    <h5 className={styles.checkoutHead}>Instant Dispatch Details</h5>
                    <div className={styles.inputGroup}>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={styles.textInput}
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.textInput}
                      />
                      <input
                        type="text"
                        required
                        placeholder="Shipping City, Country"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={styles.textInput}
                      />
                    </div>

                    {/* Summary Totals */}
                    <div className={styles.totals}>
                      <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${rawSubtotal.toFixed(2)}</span>
                      </div>
                      {appliedDiscount > 0 && (
                        <div className={styles.summaryRow} style={{ color: "#10B981" }}>
                          <span>VIP Discount (10%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className={styles.summaryRow}>
                        <span>Express Delivery</span>
                        <span style={{ color: "#10B981" }}>FREE</span>
                      </div>
                      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                        <span>Total Due</span>
                        <span style={{ color: variant.accent }}>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isCheckingOut}
                      className={styles.checkoutBtn}
                      style={{
                        background: variant.accent,
                        boxShadow: `0 8px 30px ${variant.accentGlow}`,
                      }}
                    >
                      {isCheckingOut ? (
                        <span>Securing Allocation...</span>
                      ) : (
                        <>
                          <span>Complete Reservation — ${finalTotal.toFixed(2)}</span>
                          <ArrowRight className={styles.arrowIcon} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Footer Trust Guarantee */}
            <div className={styles.drawerFooter}>
              <div className={styles.guarantee}>
                <ShieldCheck className={styles.shieldIcon} style={{ color: variant.accent }} />
                <span>30-Day Home Trial · 2-Year Full Manufacturer Warranty</span>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
