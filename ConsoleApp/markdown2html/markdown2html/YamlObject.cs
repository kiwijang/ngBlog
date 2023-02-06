using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace markdown2html
{
  class YamlObject
  {
    public string? id { get; set; }
    public string? title { get; set; }
    public string? desc { get; set; }
    public string? updated { get; set; }
    public string? created { get; set; }
    public string[]? tags { get; set; }
  }
}
