using System;
using System.IO;
using System.Linq;
using YamlDotNet.Serialization;
using YamlDotNet.Core;
using YamlDotNet.Core.Events;
using System.Text.Json;
using Markdig;
using Markdig.Syntax;
using Markdig.Extensions.Yaml;
using Markdig.Extensions.AutoIdentifiers;
using System.Reflection.Emit;
using System.Diagnostics;
using static System.Net.Mime.MediaTypeNames;

namespace markdown2html
{
  class Program
  {
    static void Main(string[] args)
    {
      try
      {
        // 取得 ..\Dendron\notes 裡的所有 .md
        string[] fileNames = Directory.GetFiles($"..\\Dendron\\notes", "*.md");
        foreach (string fileName in fileNames)
        {
          Console.WriteLine(Path.GetFileName(fileName));
          transformMd2Html(Path.GetFileName(fileName));
        }

        // 取得 ..\Dendron\notes\assets 裡的所有 assets
        string sourcePath = $"..\\Dendron\\notes\\assets\\images";
        string[] assetsNames = Directory.GetFiles(sourcePath);
        foreach (var assetsName in assetsNames)
        {
          string targetPath = $"..\\apps\\ng-blog\\src\\";
          // 複製到 ..\\apps\\ng-blog\\src\\assets\\images\\ 裡
          File.Copy(assetsName, targetPath + assetsName.Substring(17), true);

          //Console.WriteLine("sourcePath " + assetsName);
          //Console.WriteLine("targetPath " + targetPath + assetsName.Substring(17));
        }
        Console.WriteLine("\nassets/images/ File Copy success!");
      }
      catch (Exception e)
      {
        Console.WriteLine("The files could not be read:");
        Console.WriteLine(e.Message);
      }
    }

    public static void transformMd2Html(string markdownName)
    {
      try
      {
        string text = System.IO.File.ReadAllText($"..\\Dendron\\notes\\{markdownName}");

        var pipeline = new MarkdownPipelineBuilder().UseYamlFrontMatter().UseAutoIdentifiers(AutoIdentifierOptions.GitHub).UseMediaLinks().Build();

        MarkdownDocument doc = Markdown.Parse(text, pipeline);
        var yamlBlock = doc.Descendants<YamlFrontMatterBlock>().FirstOrDefault();

        if (yamlBlock != null)
        {
          string yaml = text.Substring(yamlBlock.Span.Start, yamlBlock.Span.Length);

          using (StringReader reader = new StringReader(yaml))
          {
            var yamlParser = new Parser(reader);
            yamlParser.Consume<StreamStart>();

            var yamlObject = new Deserializer().Deserialize(yamlParser);

            if (yamlObject != null)
            {
              var serializer = new SerializerBuilder().JsonCompatible().Build();
              var json = serializer.Serialize(yamlObject);

              // 將 json 轉為 YamlObject 並轉換日期
              YamlObject? obj = JsonSerializer.Deserialize<YamlObject>(json);
              var updTime = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddMilliseconds(long.Parse(obj.updated)).ToLocalTime();
              var createTime = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddMilliseconds(long.Parse(obj.created)).ToLocalTime();


              var yamlObj = new YamlObject
              {
                id = "",
                title = "",
                desc = "",
                updated = "",
                created = "",
                tags = null,
              };

              yamlObj.id = obj.id;
              yamlObj.title = obj.title;
              yamlObj.desc = obj.desc;
              yamlObj.updated = $"{updTime.ToShortDateString()} {updTime.ToShortTimeString()}";
              yamlObj.created = $"{createTime.ToShortDateString()} {createTime.ToShortTimeString()}";
              yamlObj.tags = obj.tags;

              //Console.WriteLine(yaml);

              //serializer.Serialize(Console.Out, yamlObj);
              // 轉換為 html
              var descHtmlText = $"<div class=\"NoteDescWrap\">" +
                $"<h1>{yamlObj.title}</h1>" +
                $"<div class=\"NoteDescWrap_desc\">{yamlObj.desc}</div>" +
                $"<div class=\"NoteDescWrap_time\">" +
                $"</div><div class=\"NoteDescWrap_tags\">";

              for (int i = 0; i < yamlObj.tags?.Length; i++)
              {
                bool isLast = i == yamlObj.tags.Length - 1;
                string link = isLast ? "" : "、";
                descHtmlText = descHtmlText + $"<span class=\"tag\">{yamlObj.tags[i]}{link}</span>";
              }

              descHtmlText = descHtmlText + $"</div>" +
                $"<span>更新時間: {yamlObj.updated}</span> | <span>新增時間: {yamlObj.updated}</span>"
                + $"</div>";

              text = Markdown.ToHtml(text, pipeline);

              // to anchor TOC
              var header = doc.Select(b => b as HeadingBlock)
              .Where(b => b != null)
                .Select(hb => { return new { value = hb!.Inline?.FirstChild?.ToString(), level = hb.Level }; });
              //Console.WriteLine(serializer.Serialize(header));

              text = descHtmlText + text;


              // to note html
              string filePath = $"..\\apps\\ng-blog\\src\\notes\\{yamlObj.id}.html";
              File.WriteAllText(filePath, text);

              // to anchor TOC
              string filePath2 = $"..\\apps\\ng-blog\\src\\notes\\{yamlObj.id}.json";
              File.WriteAllText(filePath2, serializer.Serialize(header));
            }
          }
        }

        Console.WriteLine("The text was saved successfully.");
      }
      catch (Exception e)
      {
        Console.WriteLine("The text could not be saved:");
        Console.WriteLine(e.Message);
      }
    }
  }
}
