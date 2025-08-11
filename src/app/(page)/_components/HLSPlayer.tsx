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
  Volume,
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
import { useRef } from "react";
function ClickToPlayOverlay() {
  const remote = useMediaRemote();
  const isPlaying = useMediaState("playing"); // true nếu đang phát

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onClick={() => {
        console.log(isPlaying);
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
function QualityMenu() {
  const { qualities, quality } = useMediaStore(); // lấy danh sách + hiện tại
  const remote = useMediaRemote(); // điều khiển
  console.log(qualities);
  if (!qualities.length) return null; // stream không có nhiều chất lượng

  return (
    <div className="absolute bottom-2 right-2 bg-black/60 p-2 rounded">
      {qualities.map((q) => (
        <button
          key={q.id}
          className="px-2 py-1"
          disabled={q.selected}
          onClick={() => remote.changeQuality(q)} // đổi chất lượng
        >
          {q.height}p {q.selected ? "✓" : ""}
        </button>
      ))}
      <div className="text-xs opacity-70 mt-1">
        Đang chọn: {quality ? `${quality.height}p` : "—"}
      </div>
    </div>
  );
}
function HLSPlayer() {
  const playerRef = useRef<MediaPlayerInstance>(null);

  const { qualities, quality } = useMediaStore(playerRef);
  const remote = useMediaRemote(playerRef);
  console.log(quality);
  return (
    <MediaPlayer
      ref={playerRef}
      playsInline
      src="https://res.cloudinary.com/quangthaignh/video/upload/sp_auto/v1754540645/tweeter/videos/uqre5jevgofdvdly7egq.m3u8"
      className="  border border-[#2f3336] mt-3 rounded-2xl "
    >
      <MediaProvider />
      <ClickToPlayOverlay />
      {/* <QualityMenu /> */}
      <Controls.Root className="vds-controls mx-1 w-[95%]">
        <div className="vds-controls-spacer " />
        <Controls.Group className="vds-controls-group">
          <TimeSlider.Root className="vds-time-slider vds-slider video">
            <TimeSlider.Track className="vds-slider-track" />
            <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
            <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
            <TimeSlider.Thumb className="vds-slider-thumb" />
          </TimeSlider.Root>
          {/*  */}
          <div className=" flex pb-2 items-center justify-between">
            {/*  */}
            <PlayButton className="vds-button startVideo">
              <PlayIcon className="play-icon vds-icon" />
              <PauseIcon className="pause-icon vds-icon" />
            </PlayButton>
            <div className=" flex">
              <div className="vds-time-group">
                <Time type="current" className="vds-time" />
                <div className="vds-time-divider">/</div>
                <Time type="duration" className="vds-time" />
              </div>

              <div className="relative group">
                <MuteButton className="vds-button">
                  <VolumeX className="mute-icon vds-icon" />
                  <Volume1 className="volume-low-icon vds-icon" />
                  <Volume2 className="volume-high-icon vds-icon" />
                </MuteButton>

                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2
                -mb-2 w-6 h-[90px] "
                />

                <VolumeSlider.Root
                  orientation="vertical"
                  className={cn(
                    "vds-slider absolute bottom-full left-1/2 -translate-x-1/2 mb-2 mute"
                    // "opacity-0 invisible pointer-events-none transition-opacity"
                    // "group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto",
                    // "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto"
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

              <DropdownMenu>
                <DropdownMenuTrigger className=" outline-none">
                  <Settings size={20} />
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
                      <DropdownMenuItem className="  py-3 px-4 hover:bg-[#ffffff08] cursor-pointer  ">
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

              {/*  */}
              <PIPButton className="vds-button">
                <PictureInPicture className="pip-enter-icon vds-icon" />
                <PictureInPicture2 className="pip-exit-icon vds-icon" />
              </PIPButton>

              {/*  */}
              <FullscreenButton className="vds-button">
                <Maximize2 className="fs-enter-icon vds-icon" />
                <Minimize className="fs-exit-icon vds-icon" />
              </FullscreenButton>
            </div>
            {/*  */}
          </div>
          {/*  */}
        </Controls.Group>
      </Controls.Root>
    </MediaPlayer>
  );
}

export default HLSPlayer;
