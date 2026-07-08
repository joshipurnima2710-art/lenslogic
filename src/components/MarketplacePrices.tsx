import {
  ArrowRight
} from "lucide-react";

type Props = {
  prices: any[];
};

const MarketplacePrices = ({
  prices
}: Props) => {

  if (!prices?.length) {
    return null;
  }

  return (

    <div className="lm-marketplace-card">

      <div className="lm-marketplace-title">
        Best Prices Across Stores
      </div>

      <div className="lm-marketplace-list">

        {prices.slice(0, 5).map(
          (price: any) => (

            <a
              key={price.id}
              href={price.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="lm-marketplace-item"
            >

              <div className="lm-marketplace-left">

                {
                  price.marketplace.logo ? (

                    <img
                      src={price.marketplace.logo}
                      alt={price.marketplace.name}
                      className="lm-marketplace-logo"
                    />

                  ) : (

                    <span className="lm-marketplace-name">
                      {price.marketplace.name}
                    </span>

                  )
                }

              </div>

              <div className="lm-marketplace-right">

                <span className="lm-marketplace-price">
                  ₹{Number(price.price).toLocaleString()}
                </span>

                <ArrowRight
                  size={16}
                  className="lm-marketplace-arrow"
                />

              </div>

            </a>

          )
        )}

      </div>

      {
        prices.length > 5 && (

          <div className="lm-more-stores">
            + {prices.length - 5} more stores
          </div>

        )
      }

    </div>

  );

};

export default MarketplacePrices;