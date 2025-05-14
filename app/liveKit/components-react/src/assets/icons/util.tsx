import * as React from 'react';
import { ConnectionQuality, Track } from 'livekit-client';

import {
  MicIcon,
  MicDisabledIcon,
  CameraIcon,
  CameraDisabledIcon,
  QualityUnknownIcon,
  QualityExcellentIcon,
  QualityGoodIcon,
  QualityPoorIcon,
  ScreenShareIcon,
  ScreenShareStopIcon,
} from './index';

/**
 * @internal
 */
export function getSourceIcon(source: Track.Source, enabled: boolean) {
  switch (source) {
    case Track.Source.Microphone:
      return enabled ? <MicIcon style={{ color: 'white' }} /> : <MicDisabledIcon style={{ color: 'white' }} />;
    case Track.Source.Camera:
      return enabled ? <CameraIcon /> : <CameraDisabledIcon />;
    case Track.Source.ScreenShare:
      return enabled ? <ScreenShareStopIcon /> : <ScreenShareIcon />;
    default:
      return undefined;
  }
}

/**
 * @internal
 */
export function getConnectionQualityIcon(quality: ConnectionQuality) {
  switch (quality) {
    case ConnectionQuality.Excellent:
      return <QualityExcellentIcon style={{ color: 'white' }} />;
    case ConnectionQuality.Good:
      return <QualityGoodIcon style={{ color: 'white' }} />;
    case ConnectionQuality.Poor:
      return <QualityPoorIcon style={{ color: 'red' }} />;
    default:
      return <QualityUnknownIcon style={{ color: 'white' }} />;
  }
}
