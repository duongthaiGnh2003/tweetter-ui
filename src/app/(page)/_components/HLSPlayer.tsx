"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  FullscreenButton,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MuteButton,
  PIPButton,
  PlayButton,
  Spinner,
  Time,
  TimeSlider,
  useMediaRemote,
  useMediaState,
  useMediaStore,
  VolumeSlider,
} from "@vidstack/react";

import { Controls } from "@vidstack/react";
import {
  ChartNoAxesColumn,
  Check,
  Maximize2,
  Minimize,
  PauseIcon,
  PictureInPicture,
  PictureInPicture2,
  PlayIcon,
  Settings,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { useRef, useState } from "react";
function ClickToPlayOverlay() {
  const remote = useMediaRemote();
  const isPlaying = useMediaState("playing"); // true nếu đang phát

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onClick={() => {
        if (!isPlaying) {
          remote.play();
        } else {
          remote.pause();
        }
      }} // click -> play
      onKeyDown={(e) => e.key === "Enter" && remote.play()} // hỗ trợ bàn phím
      tabIndex={0}
    />
  );
}

function HLSPlayer({
  src,
  className,
  smallVideo,
}: {
  src: string;
  className?: string;
  smallVideo?: boolean;
}) {
  const playerRef = useRef<MediaPlayerInstance>(null);
  const [isVolumeHover, setIsVolumeHover] = useState(false);
  const { qualities, quality } = useMediaStore(playerRef);
  const remote = useMediaRemote(playerRef);

  return (
    <MediaPlayer
      ref={playerRef}
      playsInline
      src={src}
      aspectRatio="1/1"
      className={cn(" w-full h-full", className)}
    >
      <MediaProvider />
      <ClickToPlayOverlay />
      <div className=" vds-buffering-indicator">
        <Spinner.Root className="vds-buffering-spinner">
          <Spinner.Track className="vds-buffering-track" />
          <Spinner.TrackFill className="vds-buffering-track-fill" />
        </Spinner.Root>
      </div>
      <Controls.Root hideOnMouseLeave={false} className="vds-controls   ">
        <div className="vds-controls-spacer " />
        <Controls.Group
          className="vds-controls-group "
          style={{
            width: "97%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {!smallVideo && (
            <TimeSlider.Root
              className={cn(
                "vds-time-slider vds-slider video  ",
                isVolumeHover && "!hidden"
              )}
            >
              <TimeSlider.Track className="vds-slider-track" />
              <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
              <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
              <TimeSlider.Thumb className="vds-slider-thumb" />
            </TimeSlider.Root>
          )}

          <div
            className={cn(
              " flex pb-2 items-center justify-between",
              smallVideo && " justify-start"
            )}
          >
            <PlayButton
              className=" vds-button startVideo"
              style={{ height: smallVideo ? "22px" : "auto" }}
            >
              <PlayIcon className="play-icon vds-icon" />
              <PauseIcon className="pause-icon vds-icon" />
            </PlayButton>
            <div className=" flex items-center gap-1">
              <div className="vds-time-group  ">
                <Time
                  type="current"
                  className="vds-time  "
                  style={{ fontSize: smallVideo ? "12px" : "auto" }}
                />
                {!smallVideo && <div className="vds-time-divider">/</div>}
                {!smallVideo && <Time type="duration" className="vds-time  " />}
              </div>
              {!smallVideo && (
                <div className=" flex items-center gap-1">
                  <div
                    className=" h-[30px] displayfullscreen:h-[40px] relative group"
                    onMouseEnter={() => setIsVolumeHover(true)}
                    onMouseLeave={() => setIsVolumeHover(false)}
                  >
                    <MuteButton className="vds-button">
                      <VolumeX className="mute-icon vds-icon" />
                      <Volume1 className="volume-low-icon vds-icon" />
                      <Volume2 className="volume-high-icon vds-icon" />
                    </MuteButton>

                    <div className={isVolumeHover ? "block" : "hidden"}>
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2
                  -mb-2 w-6 h-[90px] "
                      />

                      <VolumeSlider.Root
                        orientation="vertical"
                        className={cn(
                          "vds-slider absolute bottom-full left-1/2 -translate-x-1/2 mb-2 mute"
                        )}
                        style={{
                          position: "absolute",
                        }}
                      >
                        <VolumeSlider.Track className="vds-slider-track" />
                        <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                        <VolumeSlider.Thumb className="vds-slider-thumb" />
                      </VolumeSlider.Root>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger className=" vds-button ">
                      <Settings className="vds-icon" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="pointer-events-auto  bg-background border border-black p-0  "
                      style={{
                        boxShadow:
                          "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
                      }}
                      side="top"
                      align="center"
                    >
                      <DropdownMenuItem className="  py-3 px-4 hover:bg-[#ffffff08] cursor-pointer  ">
                        <div className=" font-bold  flex  items-center ">
                          <div className="mr-3">
                            <ChartNoAxesColumn />
                          </div>
                          <p>Video quality</p>
                        </div>
                      </DropdownMenuItem>

                      {qualities.map((item, index) => {
                        return (
                          <DropdownMenuItem
                            key={index}
                            className="  py-3 px-4 hover:bg-[#ffffff08] cursor-pointer  "
                            onClick={() => {
                              remote.changeQuality(index);
                            }}
                          >
                            <div className="  w-full font-bold  flex  items-center ">
                              <div className=" flex-1 ">{item.height}</div>
                              {quality?.height === item.height && (
                                <div className="ml-5">
                                  <Check size={18} color="#1d9bf0" />
                                </div>
                              )}
                            </div>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <PIPButton className="vds-button">
                    <PictureInPicture
                      size={20}
                      className="pip-enter-icon vds-icon"
                    />
                    <PictureInPicture2
                      size={20}
                      className="pip-exit-icon vds-icon"
                    />
                  </PIPButton>

                  <FullscreenButton className="vds-button">
                    <Maximize2 className="fs-enter-icon vds-icon" />
                    <Minimize className="fs-exit-icon vds-icon" />
                  </FullscreenButton>
                </div>
              )}
            </div>
          </div>
        </Controls.Group>
      </Controls.Root>
    </MediaPlayer>
  );
}

export default HLSPlayer;
