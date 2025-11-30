# Section 6: Kothbiro Case File - Asset Instructions

## Video File Setup

Place your video file in this directory with the name:
```
kothbiro_to_yikes.mp4
```

The component will automatically look for it at `/section6/kothbiro_to_yikes.mp4`

### Using Local Video
- Keep the video file in this folder
- The default configuration uses a local `<video>` element
- Supported formats: MP4, WebM, OGG

### Using External Video (YouTube/Vimeo)
If you want to use a YouTube or Vimeo video instead:

1. Open `section6/SectionSixCaseFile.tsx`
2. Find the line: `const [useExternalVideo, setUseExternalVideo] = useState(false);`
3. Change `false` to `true`
4. Update the `externalVideoUrl` variable with your embed URL:
   - YouTube: `https://www.youtube.com/embed/YOUR_VIDEO_ID`
   - Vimeo: `https://player.vimeo.com/video/YOUR_VIDEO_ID`

## Content Replacement Guide

Open `section6/SectionSixCaseFile.tsx` and search for the following markers to paste your content:

### 1. Intro Paragraph
Search for: `[PLACEHOLDER INTRO]`
Replace the entire paragraph with your introduction text.

### 2. Police Report Content
Search for these markers and replace each section:
- `[PASTE YOUR TEXT - e.g., "Unauthorized Sampling"]` - Incident Type
- `[PASTE YOUR TEXT - e.g., "June 12, 2018"]` - Date Filed
- `[PASTE YOUR TEXT]` - Alleged Offense
- `[PASTE YOUR POLICE REPORT SUMMARY HERE]` - Main report body
- `[PASTE OFFICER NAME/BADGE]` - Officer signature
- `[PASTE DATE]` - Date signature

### 3. Video Caption
Search for: `[PASTE YOUR VIDEO CAPTION]`
Replace with your description of what the video demonstrates.

### 4. Analytical Conclusion
Search for: `[PASTE YOUR ANALYTICAL CONCLUSION PARAGRAPH 1]`
Replace each `[PASTE PARAGRAPH X]` marker with your analysis paragraphs.
The text area will automatically scroll if your content is long.

### 5. References
Search for: `[PASTE YOUR REFERENCES]`
Replace the example citations with your actual sources.

## Component Integration

To add this section to your main page, add it to `app/page.tsx`:

```tsx
import SectionSixCaseFile from "@/section6/SectionSixCaseFile";

// In your desktopItems array:
{
  id: "section6-kothbiro-case",
  name: "Section 6: Kothbiro",
  type: "folder",
  x: 20,
  y: 700, // Adjust position as needed
  content: <SectionSixCaseFile />,
},
```

## Styling Notes

The component uses:
- Beige background (#e8e0d0) matching the vintage Mac aesthetic
- Black borders (border-3)
- Red evidence stamps
- Paper texture effects (subtle line patterns)
- Slight rotation transforms for document realism
- Dog-ear corner on Evidence 1
- Monospace font for police report
- Scrollable text area for long analytical content
