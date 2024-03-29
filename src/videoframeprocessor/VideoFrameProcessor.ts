// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Destroyable from '../destroyable/Destroyable';
import EventController from '../eventcontroller/EventController';
import VideoFrameBuffer from './VideoFrameBuffer';

/**
 * [[VideoFrameProcessor]] is defined as a unit of video processing.
 * It transforms an array of {@link VideoFrameBuffer} and produces an array of {@link VideoFrameBuffer}.
 * It can be chained together to be used with {@link VideoFrameProcessorPipeline}.
 */
export default interface VideoFrameProcessor extends Destroyable {
  /**
   * Processes the array of {@link VideoFrameBuffer} and returns an array of {@link VideoFrameBuffer}.
   */
  process(buffers: VideoFrameBuffer[]): Promise<VideoFrameBuffer[]>;

  /**
   * Destroys the processor.
   */
  destroy(): Promise<void>;

  /**
   * Set the {@link EventController} to the VideoFrameProcessor
   * @param eventController
   */
  setEventController?(eventController: EventController): void;
}
