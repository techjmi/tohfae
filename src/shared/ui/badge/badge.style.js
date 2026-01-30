//badge style file for the badge component
import { BADGE_SIZE, BADGE_RADIUS, BADGE_COLOR } from "./badgeConstant";

export const getBadgeClasses = ({ size, radius, color }) => {
  const sizeCls = BADGE_SIZE[size] || BADGE_SIZE.md;
  const radiusCls = BADGE_RADIUS[radius] || BADGE_RADIUS.md;
  const colorCls = BADGE_COLOR[color] || BADGE_COLOR.neutral;
  return `${sizeCls} ${radiusCls} ${colorCls}`;
};