import { NextRequest, NextResponse } from 'next/server';
import { getCase } from '@/lib/store';
import { exportCaseToJson } from '@/lib/export/json';
import { exportCaseToMarkdown } from '@/lib/export/markdown';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const caseData = getCase(id);

  if (!caseData) {
    return NextResponse.json({ error: 'Case not found' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';

  if (format === 'md' || format === 'markdown') {
    const md = exportCaseToMarkdown(caseData);
    return new NextResponse(md, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="openfish-${id}.md"`,
      },
    });
  }

  const jsonStr = exportCaseToJson(caseData);
  return new NextResponse(jsonStr, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="openfish-${id}.json"`,
    },
  });
}
