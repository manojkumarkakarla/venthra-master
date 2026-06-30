import { useState, useEffect, useRef } from "react";
import {
  Instagram,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Zap,
  Check,
  ArrowRight
} from "lucide-react";
import instagramQr from "@/assets/instagram-qr.png";
import vtsLogo from "@/assets/VTS_NEW_LOGO.png";

// Import client assets
import sid1 from "@/assets/sidhharth-1.jpeg";
import vali1 from "@/assets/vali-1.png";
import sri1 from "@/assets/srikrishna-1.png";

interface ClientReel {
  id: string;
  youtubeId: string;
  clientName: string;
  company: string;
  handle: string;
  location: string;
  coverImage: string;
  likes: number;
  commentsCount: number;
  views: string;
  previewQuote: string;
  fullQuote: string;
  projectBuilt: string;
  techStack: string[];
  metrics: string[];
}

const clientReels: ClientReel[] = [
  {
    id: "reel-0",
    youtubeId: "x8PtAeh8mCw",
    clientName: "Alisher",
    company: "Alisher Digital Academy",
    handle: "alisher",
    location: "Global",
    coverImage: sid1,
    likes: 500,
    commentsCount: 20,
    views: "20K",
    previewQuote: "Amazing work! 🚀",
    fullQuote: "Fantastic experience working with Venthra Solutions.",
    projectBuilt: "Digital Academy",
    techStack: ["React", "Vite", "Tailwind"],
    metrics: ["Awesome performance"]
  },
  {
    id: "reel-1",
    youtubeId: "0U2fZrg6LEo",
    clientName: "Siddharth",
    company: "EGM Tech Group",
    handle: "siddharth_egm",
    location: "Munich, Germany",
    coverImage: sid1,
    likes: 342,
    commentsCount: 15,
    views: "14.2K",
    previewQuote: "Venthra delivered our high-performance SaaS platform ahead of schedule. The speed is unmatched! ⚡",
    fullQuote: "Working with Venthra Solutions was a game changer for our enterprise software suite. They rebuilt our core dashboard with next-gen speed, clean responsive boundaries, and a gorgeous obsidian aesthetic. The sub-second loading speeds completely wowed our executive board.",
    projectBuilt: "EGM Cloud Portal",
    techStack: ["Next.js", "Vite", "Tailwind CSS", "Node.js"],
    metrics: ["Sub-second dashboard load time", "40% increase in workflow efficiency", "99.9% application uptime uptime"]
  },
  {
    id: "reel-2",
    youtubeId: "1r7JdupAI08",
    clientName: "Vali",
    company: "SSLN New Energy",
    handle: "vali_ssln",
    location: "Oslo, Norway",
    coverImage: vali1,
    likes: 418,
    commentsCount: 22,
    views: "18.5K",
    previewQuote: "Absolute game-changers. Digital conversion rates increased by 40% after launching the site. 📈",
    fullQuote: "We needed a corporate website that projected absolute trust and cutting-edge biophilic design. Venthra engineered a fluid, high-performance portfolio featuring responsive image galleries and clean content layouts. The customer feedback has been overwhelmingly positive.",
    projectBuilt: "SSLN Sustainable Plaza",
    techStack: ["React", "TypeScript", "GSAP Shaders", "PWA"],
    metrics: ["40% increase in client conversions", "Zero-lag responsive layout", "Fully responsive PWA capabilities"]
  },
  {
    id: "reel-3",
    youtubeId: "jVEW2JdIWvA",
    clientName: "Srikrishna",
    company: "Sri Krishna Construction",
    handle: "srikrishna_tech",
    location: "Valencia, Spain",
    coverImage: sri1,
    likes: 295,
    commentsCount: 12,
    views: "11.9K",
    previewQuote: "Our visual portfolio requires extreme design precision. VTS absolutely nailed the execution! 🎨",
    fullQuote: "As a high-end construction firm, visual showcase is everything for us. Venthra built a geometric panel layout that displays our projects with editorial framing and premium Georgia numbering. It's structural architecture rendered beautifully on screen.",
    projectBuilt: "VTS Construction Portfolio",
    techStack: ["Vite", "GSAP ScrollTrigger", "Lenis", "Georgia Font Styling"],
    metrics: ["Bespoke editorial structure", "Smooth scrolling integration", "Pixel-perfect gallery viewports"]
  }
];

const instagramEmbedHtml1 = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DZ3ud5bp3SN/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DZ3ud5bp3SN/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DZ3ud5bp3SN/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by VENTHRA  SOLUTIONS 🌐 (@venthrasolutions)</a></p></div></blockquote>`;

const instagramEmbedHtml2 = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DY9iJcIpCo7/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DY9iJcIpCo7/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DY9iJcIpCo7/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by VENTHRA  SOLUTIONS 🌐 (@venthrasolutions)</a></p></div></blockquote>`;

const instagramEmbedHtml3 = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DZzouryp_zw/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DZzouryp_zw/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DZzouryp_zw/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by VENTHRA  SOLUTIONS 🌐 (@venthrasolutions)</a></p></div></blockquote>`;
const Examples = () => {
  return (
    <section id="examples" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden border-t border-slate-200/50">
      {/* Background Ambience Removed for Scroll Performance */}

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex justify-center mb-4">
            <span className="text-blue-600 text-xs font-bold tracking-[0.25em] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm flex items-center gap-1.5 animate-pulse">
              <Instagram className="w-3.5 h-3.5 text-blue-600" /> Instagram Feed
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Georgia'] font-bold text-slate-900 tracking-tight mb-4">
            Global Architecture Showcase
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
            Follow our virtual journal exploring concrete, steel, and code. Scan our QR code to sync directly.
          </p>
        </div>

        {/* Instagram Profile Header Card */}
        <div className="bg-white border border-slate-200 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 mb-12 shadow-[0_15px_40px_rgba(0,0,0,0.02)] transition-all duration-300 w-full overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 lg:gap-12">
            
            {/* Left side: Avatar + Bio (Always Row) */}
            <div className="flex flex-row items-start gap-4 sm:gap-6 md:gap-12 w-full lg:w-auto flex-1">
              {/* Instagram Profile Avatar */}
              <div className="relative group shrink-0 mt-1">
                <div className="absolute inset-0 -m-1 sm:-m-1.5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 animate-pulse opacity-80" />
                <div className="absolute inset-0 -m-1 sm:-m-1.5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 sm:border-4 border-white overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={vtsLogo}
                    alt="VTS Architecture profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Information */}
              <div className="flex-1 text-left space-y-3 sm:space-y-4">
                {/* Username row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 justify-start">
                  <h3 className="font-semibold text-lg sm:text-xl text-slate-800 flex items-center gap-1.5 select-all">
                    venthrasolutions
                  </h3>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.instagram.com/venthrasolutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 sm:px-5 py-1.5 bg-[#0095f6] hover:bg-[#1877f2] text-white rounded-lg text-[11px] sm:text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Instagram className="w-3.5 h-3.5" /> Follow
                    </a>
                    <button
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 sm:px-5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>

                {/* Subtitle Header */}
                <div className="text-slate-500 text-[11px] sm:text-xs font-medium tracking-wide flex items-center justify-start gap-1">
                  VENTHRA SOLUTIONS 🌐
                </div>

                {/* Stats Row */}
                <div className="flex justify-start items-center gap-4 sm:gap-6 text-xs sm:text-sm border-0 py-0 select-none">
                  <div>
                    <span className="font-bold text-slate-800">25</span> <span className="text-slate-500 font-light">posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">10k</span> <span className="text-slate-500 font-light">followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">4</span> <span className="text-slate-500 font-light">following</span>
                  </div>
                </div>

                {/* Bio Details */}
                <div className="space-y-1 text-slate-700 text-xs sm:text-sm font-light leading-relaxed">
                  <p className="font-normal text-slate-800 flex items-center justify-start gap-1">
                    Venthra Solutions 🏛️
                  </p>
                  <p>High-End Web & App Dev</p>
                  <p className="flex items-center justify-start gap-1">
                    <span className="text-slate-800">👤</span> Founder: <span className="text-blue-900 font-normal hover:underline cursor-pointer">@_charaan01</span>
                  </p>
                  <p className="flex items-center justify-start gap-1">
                    <span className="text-[#0095f6]">🛡️</span> Verified Google Developer
                  </p>
                </div>
              </div>
            </div>

            {/* Premium QR Code Card - Stacks bottom on mobile */}
            <div className="shrink-0 flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-2 p-3 lg:p-4 bg-slate-50/50 border border-slate-200/85 rounded-2xl lg:rounded-[2rem] w-full lg:w-40 hover:shadow-md transition-all duration-300 select-none text-left lg:text-center mt-2 lg:mt-0">
              <div className="relative group/qr bg-white p-2 rounded-xl lg:rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden shrink-0">
                <img
                  src={instagramQr}
                  alt="Instagram QR Code"
                  className="w-16 h-16 lg:w-28 lg:h-28 object-contain rounded-lg transition-transform duration-300 group-hover/qr:scale-105"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] lg:text-[9px] font-bold text-slate-500 uppercase tracking-widest block leading-none">
                  VTS Instagram
                </span>
                <span className="text-[9px] lg:text-[8px] font-medium text-slate-400 block uppercase tracking-wider leading-none mt-0.5 lg:mt-1">
                  Scan to follow
                </span>
              </div>
            </div>
            
          </div>
        </div>

        {/* What we Venthra Solutions is? Section */}
        <div className="mt-12 sm:mt-16 mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 justify-center lg:justify-start">
            <span className="w-1.5 h-6 bg-[#0095f6] rounded-full shrink-0" />
            <h3 className="font-['Georgia'] text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              What we Venthra Solutions is?
            </h3>
          </div>

          <div className="relative bg-white border border-blue-100/40 rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,100,255,0.08)] flex flex-col md:flex-row items-center gap-8 md:gap-14 overflow-hidden group/special">
            {/* Subtle background glow effect removed for performance */}
            {/* Left side: Premium Text Content */}
            <div className="flex-1 space-y-7 relative z-10">
              <h4 className="text-3xl sm:text-4xl lg:text-[42px] font-['Georgia'] font-extrabold tracking-tight leading-[1.15]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
                  We are the absolute best choice to bring your project to life.
                </span>
              </h4>

              {/* Mobile-only Premium Video Mockup Card */}
              <div className="md:hidden w-full max-w-[320px] mx-auto aspect-[9/16] shrink-0 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-200/80 bg-slate-900 relative group transition-all duration-500 p-1 will-change-transform">
                <div className="w-full h-full relative overflow-hidden rounded-[1.8rem]">
                  <iframe
                    src="https://www.youtube.com/embed/0moOyDn_Emk"
                    title="Mana Kurnool.. Mana Nandyal.. Ippudu Technology lo evariki thakkuva kaadhu! 🔥"
                    className="absolute inset-0 w-full h-full border-0 rounded-[1.8rem]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed">
                At Venthra Solutions, we build digital structures with extreme visual precision and elite performance. We specialize in high-end software development, PWA platforms, and responsive portal design.{' '}
                <strong className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 block mt-3 text-lg">
                  Our engineering quality is unmatched—so advanced that if we can't build it, no one can.
                </strong>
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  "High-End Web & App Dev",
                  "Verified Google Developer",
                  "PWA & App Experts",
                  "High Performance Architectures"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-medium group cursor-default">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)] group-hover:border-blue-200 transition-all duration-300">
                      <Zap className="w-4 h-4 fill-blue-500 text-blue-500 group-hover:fill-indigo-500 group-hover:text-indigo-500 transition-colors duration-300" />
                    </div>
                    <span className="group-hover:text-blue-700 transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 overflow-hidden flex items-center gap-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10">Start Project Inquiries</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right side: Premium Video Mockup Card */}
            <div
              className="hidden md:block w-full md:w-[320px] aspect-[9/16] shrink-0 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-200/80 bg-slate-900 relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-blue-500/40 p-1 will-change-transform"
            >
              <div className="w-full h-full relative overflow-hidden rounded-[1.8rem]">
                  <iframe
                    src="https://www.youtube.com/embed/0moOyDn_Emk"
                    title="Mana Kurnool.. Mana Nandyal.. Ippudu Technology lo evariki thakkuva kaadhu! 🔥"
                    className="absolute inset-0 w-full h-full border-0 rounded-[1.8rem]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
              </div>
            </div>
          </div>
        </div>

        {/* Happy Clients Instagram Videos/Reels Showcase */}
        <div className="mt-12 sm:mt-16">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 justify-center lg:justify-start">
            <span className="w-1.5 h-6 bg-[#0095f6] rounded-full shrink-0" />
            <h3 className="font-['Georgia'] text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Happy Clients Review Showcase
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
            {clientReels.map((reel, index) => {
              return (
                <div
                  key={reel.id}
                  className="group relative w-full aspect-[9/16] rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200/80 bg-slate-950 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)] hover:border-blue-500/40 p-1 will-change-transform"
                >
                  <div className="w-full h-full relative overflow-hidden rounded-[1.4rem]">
                    <iframe
                      src={`https://www.youtube.com/embed/${reel.youtubeId}`}
                      title={`${reel.clientName} Review`}
                      className="absolute inset-0 w-full h-full border-0 rounded-[1.4rem]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Examples;
