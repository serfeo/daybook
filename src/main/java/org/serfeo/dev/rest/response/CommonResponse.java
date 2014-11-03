package org.serfeo.dev.rest.response;

import java.util.Set;

public class CommonResponse
{
    private String status;
    private Param[] params;

    public CommonResponse(){}

    public String getStatus() { return status; }
    public void setStatus( String status ) { this.status = status; }

    public Param[] getParams() { return params; }
    public void setParams( Param[] params ) { this.params = params; }

    public static class Param
    {
        private String name;
        private String value;

        public Param(){};
        public Param( String name, Object value )
        {
            this.name = name;
            this.value = value.toString();
        }

        public String getName() { return name; }
        public void setName( String name ) { this.name = name; }

        public String getValue() { return value; }
        public void setValue( String value ) { this.value = value; }
    }

    public static CommonResponse ok( Param[] params )
    {
        CommonResponse commonResponse = new CommonResponse();
        commonResponse.setStatus( "ok" );
        commonResponse.setParams( params );
        return commonResponse;
    }
}