import {
  Progress as _Progress,
  ProgressFilledTrack as _ProgressFilledTrack,
  styled,
} from '@gluestack-ui/themed'

/**
  Progress example:
  <Progress value={40} w={300}>
    <ProgressFilledTrack />
  </Progress>
 */
export const Progress = styled(_Progress)
export const ProgressFilledTrack = styled(_ProgressFilledTrack)
