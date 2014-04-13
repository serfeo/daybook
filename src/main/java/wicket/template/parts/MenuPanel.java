package wicket.template.parts;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;

public class MenuPanel extends Panel
{
  public MenuPanel(String id)
  {
    super( id );
    add( new Label( "message", "Content message" ) );
  }
}
