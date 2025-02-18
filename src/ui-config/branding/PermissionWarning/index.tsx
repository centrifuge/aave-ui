import { PERMISSION } from '@aave/contract-helpers';
import React from 'react';
import { useIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExtendedMarketDataType } from '../../markets';
import Caption from '../../../components/basic/Caption';
import ContentWrapper from '../../../components/wrappers/ContentWrapper';
import ScreenWrapper from '../../../components/wrappers/ScreenWrapper';
import { isFeatureEnabled } from '../../../helpers/config/markets-and-network-config';
import { useStaticPoolDataContext } from '../../../libs/pool-data-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { usePermissions } from '../../../libs/use-permissions/usePermissions';
import messages from './messages';
import staticStyles from './style';

interface PermissionWarningProps {
  requiredPermission: PERMISSION;
  children: React.ReactElement;
}

/**
 * Is rendered when you're trying to perform an action you are not allowed to
 * @param requiredPermission holds the permission currently needed
 * @returns
 */
const PermissionWarning: React.FC<
  RouteComponentProps<{ id?: string; underlyingAsset?: string }> & PermissionWarningProps
> = ({ children, requiredPermission, match }) => {
  const intl = useIntl();
  const currentMarketData = useProtocolDataContext().currentMarketData as ExtendedMarketDataType;
  const { userId } = useStaticPoolDataContext();
  const { permissions } = usePermissions();

  const isUSDC =
    match.params.underlyingAsset?.toLowerCase() === currentMarketData.USDCAddress?.toLowerCase();
  const canDepositAndBorrow = [PERMISSION.DEPOSITOR, PERMISSION.BORROWER].every((p) =>
    permissions.includes(p)
  );

  if (
    (!isFeatureEnabled.permissions(currentMarketData) ||
      !userId ||
      permissions.includes(requiredPermission)) &&
    (requiredPermission !== PERMISSION.DEPOSITOR ||
      isUSDC ||
      canDepositAndBorrow ||
      (requiredPermission === PERMISSION.DEPOSITOR && match.params.underlyingAsset === undefined))
  ) {
    return children;
  }

  return (
    <ScreenWrapper isTopLineSmall={true} className="PermissionWarning">
      <ContentWrapper withBackButton={true} withFullHeight={true}>
        {console.log({
          requiredPermission,
          permissions,
          underlyingAsset: match.params.underlyingAsset,
          usdc: currentMarketData.USDCAddress,
        })}
        {requiredPermission === PERMISSION.DEPOSITOR &&
        match.params.underlyingAsset &&
        !isUSDC &&
        !canDepositAndBorrow ? (
          <Caption
            title="DROP participation is restricted"
            description={
              <>
                Only signed up Tinlake Pools and their respective Issuers are allowed to deposit
                DROP tokens and borrow stablecoins in the RWA Market.
              </>
            }
          />
        ) : requiredPermission === PERMISSION.DEPOSITOR ? (
          <Caption title="Currently, it is not possible to onboard to the RWA market." />
        ) : requiredPermission === PERMISSION.LIQUIDATOR ? (
          <Caption
            title={intl.formatMessage(messages.caption)}
            description={
              <>
                To liquidate assets in the RWA market, you need to complete KYC and sign a
                Subscription Agreement with the Issuer of the DROP token that you wish to liquidate.
              </>
            }
          />
        ) : requiredPermission === PERMISSION.BORROWER ? (
          <Caption
            title="USDC borrowing is restricted"
            description={
              <>
                Only signed up Tinlake Pools and their respective Issuers are allowed to deposit
                DROP tokens and borrow stablecoins in the RWA Market.
              </>
            }
          />
        ) : (
          <Caption
            title={intl.formatMessage(messages.caption)}
            description={intl.formatMessage(messages.description)}
          />
        )}
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
};

export default withRouter(PermissionWarning);
