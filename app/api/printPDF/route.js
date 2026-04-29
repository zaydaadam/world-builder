import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

//pTitle = project title
//pDesc = project Descripiton
//pID = project ID
//location = character, chapter, or map

export async function POST(res){
    try {
        const body = await res.json();
        const {pTitle, pDesc, pID, location, data} = body;

        let formattedContent;

        if (location == "chapter"){
            formattedContent = Array.isArray(data) 
            ? data.map(item => `
                <div style="margin-bottom: 30px;">
                    <h2 style="font-size: 24px; color: #1f2937; margin-bottom: 8px;">
                        ${item.title || 'Untitled'}
                    </h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #374151; white-space: pre-wrap;">
                        ${item.content || 'No content provided.'}
                    </p>
                </div>
            `).join('')
            : `<p>No data available</p>`;
        } else if (location == "character") {
            formattedContent = Array.isArray(data) 
            ? data.map(item => `
                <div style="margin-bottom: 30px;">
                    <h2 style="font-size: 24px; color: #1f2937; margin-bottom: 8px;">
                        ${item.name || 'Unamed'}
                    </h2>
                    <h2 style="font-size: 24px; color: #1f2937; margin-bottom: 8px;">
                        ${item.role || 'no role'}
                    </h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #374151; white-space: pre-wrap;">
                        ${item.description || 'No description provided.'}
                    </p>
                    ${item.image ? `
                    <div style="margin-bottom: 15px;">
                        <img 
                            src="${item.image}" 
                            style="max-width: 100%; height: auto; border-radius: 8px; max-height: 300px;"
                            alt="${item.name}"
                        />
                    </div>
                    ` : ''}
                </div>
            `).join('')
            : `<p>No data available</p>`;
        } else if (location == "map") {
            formattedContent = Array.isArray(data) 
            ? data.map(item => `
                <div style="margin-bottom: 30px;">
                    ${item.image ? `
                    <div style="margin-bottom: 15px;">
                        <img 
                            src="${item.image}" 
                            style="max-width: 100%; height: auto; border-radius: 8px; max-height: 300px;"
                            alt="${item.name}"
                        />
                    </div>
                    ` : ''}
                </div>
            `).join('')
            : `<p>No data available</p>`;
        }
        

        const htmlContent = `
            <html>
                <body style="font-family: sans-serif; padding: 40px;">
                    <h1 style="font-size: 42px; margin-bottom: 10px; font-weight: 700;">
                        ${pTitle}
                    </h1>
                    <p style="font-size: 18px; margin-bottom: 40px; color: #4b5563; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
                        ${pDesc}
                    </p>
                    <div>
                        ${formattedContent}
                    </div>
                </body>
            </html>
        `;

        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: 'new'});
        const page = await browser.newPage();

        await page.setContent(htmlContent, {waitUntil: 'domcontentloaded'});

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {top: '20px', bottom: '20px'}
        });

        await browser.close();

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${pID}.pdf"`,
            },
        });

    } catch (error) {
        return NextResponse.json({error: 'PDF print failed'}, {status: 500});
    }
}