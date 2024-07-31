import {
  Badge as _Badge,
  BadgeIcon as _BadgeIcon,
  BadgeText as _BadgeText,
  styled,
} from '@gluestack-ui/themed'

/**
  Badge example:
  <Badge>
    <BadgeText>sample</BadgeText>
    <BadgeIcon as={GlobeIcon} />
  </Badge>
 */
export const Badge = styled(_Badge)
export const BadgeText = styled(_BadgeText)
export const BadgeIcon = styled(_BadgeIcon)
