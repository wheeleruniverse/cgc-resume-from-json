![Vercel Deploy](https://deploy-badge.vercel.app/vercel/cgc-resume-from-json?style=for-the-badge)

# Resume from JSON -- Code Portfolio Challenge

A dynamic resume website built with Blazor and Next.js, deployed on Vercel. This project converts JSON resume data into a beautiful, responsive web presentation with sharing capabilities.

## 🌟 Overview

This project was created as part of the [Code Portfolio Challenge](https://www.allhandsontech.com/programming/code-portfolio-challenge/) by Jeremy Morgan. The challenge was to build a resume website that dynamically renders from a JSON file, demonstrating the separation of data and presentation layers.

**Live Demo**: [https://cgc-resume-from-json.vercel.app/](https://cgc-resume-from-json.vercel.app/)

## 🚀 Features

- **Dynamic JSON Resume**: Renders resume content from structured JSON data
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Share Functionality**: Upload custom resumes and generate shareable URLs
- **Modern UI**: Clean, professional design with mobile-first approach
- **Anchor Navigation**: Smooth scrolling between resume sections
- **Flexible Data Structure**: Supports optional fields that gracefully hide when not provided

## 🛠️ Technology Stack

### Frontend (Blazor)
- **Blazor WebAssembly**: C# frontend framework
- **CascadingParameter**: Efficient data flow between components
- **IJSRuntime**: JavaScript interoperability for browser APIs
- **Responsive CSS**: Mobile-first design with media queries

### Backend (Next.js)
- **Next.js API Routes**: Server-side endpoints for blob storage
- **TypeScript**: Type-safe API development
- **Vercel Blob Storage**: Secure file storage for shared resumes

### Deployment
- **Vercel**: Hosting platform for both frontend and backend
- **Monorepo Architecture**: Organized codebase with separate directories

## 📁 Project Structure

```
cgc-resume-from-json/
├── web/                          # Blazor WebAssembly application
│   ├── wwwroot/
│   │   └── data/
│   │       └── wheeler-resume.json
│   ├── Components/
│   ├── Pages/
│   └── Services/
│       └── BrowserService.cs
├── app/                          # Next.js API backend
│   └── pages/
│       └── api/
│           └── blob.ts
├── README.md
└── package.json
```

## 🎯 Key Features Explained

### 1. Dynamic JSON Loading
The application uses `Http.GetFromJsonAsync` to load resume data from a static JSON file:

```csharp
// Home.razor
protected override async Task OnInitializedAsync()
{
    _resume = await Http.GetFromJsonAsync<Resume>("data/wheeler-resume.json");
}
```

### 2. Cascading Parameters
Resume data is shared across components using Blazor's cascading value system:

```csharp
// MainLayout.razor
<CascadingValue Value="@_resume">
    @Body
</CascadingValue>

// Child Components
[CascadingParameter]
public MainLayout.Resume Resume { get; set; } = null!;
```

### 3. Responsive Design
The application detects screen size and adapts content accordingly:

```csharp
public async Task<BrowserScreenSize> GetScreenSize()
{
    var dimensions = await GetDimensions();
    return dimensions.Width switch
    {
        >= 1024 => BrowserScreenSize.Desktop,
        >= 768 => BrowserScreenSize.Tablet,
        _ => BrowserScreenSize.Mobile
    };
}
```

### 4. Share Functionality
Users can upload their own JSON resumes and get shareable URLs:

```typescript
// API endpoint for storing resumes
async function putBlob(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const id = crypto.randomUUID();
    const result = await put(`${id}.json`, JSON.stringify(req.body), options);
    res.status(200).json({ id, downloadUrl, pathname, url });
}
```

## 🔧 Getting Started

### Prerequisites
- .NET 7.0 SDK
- Node.js 18+ 
- Vercel CLI (optional, for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wheeleruniverse/cgc-resume-from-json.git
   cd cgc-resume-from-json
   ```

2. **Set up the Blazor frontend**
   ```bash
   cd web
   dotnet restore
   dotnet run
   ```

3. **Set up the Next.js backend**
   ```bash
   cd app
   npm install
   npm run dev
   ```

### Running Locally

**Blazor App** (Frontend):
```bash
cd web
dotnet run
```
Visit `http://localhost:5000`

**Next.js App** (Backend):
```bash
cd app
npm run dev
```
API available at `http://localhost:3000/api`

## 📄 Resume JSON Format

The resume JSON follows this structure:

```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "email": "your.email@example.com",
  "phone": "+1-555-123-4567",
  "location": "City, State",
  "summary": "Professional summary...",
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "startDate": "2020-01",
      "endDate": "2023-12",
      "description": "Job description and achievements..."
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Type",
      "graduationDate": "2020",
      "gpa": "3.8"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "urls": [
    {
      "name": "LinkedIn",
      "url": "https://linkedin.com/in/yourprofile"
    }
  ]
}
```

All fields are optional - sections will automatically hide if data is not provided.

## 🚀 Deployment

### Vercel Deployment

**Frontend (Blazor)**:
```bash
# Build Command
dotnet publish --configuration Release --output Publish --self-contained

# Output Directory
Publish/wwwroot

# Install Command
rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm && yum install dotnet-sdk-7.0 -y
```

**Backend (Next.js)**:
Uses standard Next.js deployment settings with Vercel presets.

### Environment Variables
Set up the following environment variables in Vercel:
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob storage access token

## 🎨 Customization

### Styling
The application uses standard CSS with media queries. Key responsive breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

### Adding New Sections
1. Update the Resume model in C#
2. Add corresponding properties to the JSON schema
3. Create a new Blazor component for the section
4. Add the component to the main layout

## 📚 Learning Resources

This project demonstrates several important concepts:

- **Separation of Concerns**: Data (JSON) separate from presentation (HTML/CSS)
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Modern C# Web Development**: Using Blazor for SPA development
- **API Development**: Building RESTful services with Next.js
- **Cloud Storage**: Integrating with Vercel Blob storage
- **JavaScript Interop**: Calling JavaScript from C# in Blazor

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Jeremy Morgan** for creating the [Code Portfolio Challenge](https://www.allhandsontech.com/programming/code-portfolio-challenge/)
- **Lars Klint** for the LinkedIn post that introduced Blazor
- **Meziantou** for the [anchor navigation solution](https://www.meziantou.net/anchor-navigation-in-a-blazor-application.htm)
- **JSON Resume** community for inspiration on resume data structure

## 📧 Contact

**Justin Wheeler** - [@wheeleruniverse](https://linkedin.com/in/wheeleruniverse)

Project Link: [https://github.com/wheeleruniverse/cgc-resume-from-json](https://github.com/wheeleruniverse/cgc-resume-from-json)

---

*Built with ❤️ using Blazor, Next.js, and Vercel*
