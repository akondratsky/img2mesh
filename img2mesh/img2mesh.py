import adsk.core, adsk.fusion, adsk.cam, traceback
import json, tempfile, platform

handlers = []
_app = adsk.core.Application.cast(None)
_ui = adsk.core.UserInterface.cast(None)

class ShowPaletteCommandExecuteHandler(adsk.core.CommandEventHandler):
    def __init__(self):
        super().__init__()
    def notify(self, args):
        try:
            global _app, _ui
            
            # Verify that in parametric design mode
            design = _app.activeProduct
            if design.designType != adsk.fusion.DesignTypes.ParametricDesignType:
                _ui.messageBox('The "img2mesh" command must be run in parametric modeling mode.\n\nPlease enable "Capture design history" for your document.')
                return

            # Create and display the palette.
            palette = _ui.palettes.itemById('img2meshPalette')
            if not palette:
                palette = _ui.palettes.add('img2meshPalette', 'img2mesh', 'index.html', True, True, True, 1024, 768)
    
                # Add handler to HTMLEvent of the palette.
                onHTMLEvent = MyHTMLEventHandler()
                palette.incomingFromHTML.add(onHTMLEvent)
                handlers.append(onHTMLEvent)
            else:
                palette.isVisible = True                              
        except:
            _ui.messageBox('Command executed failed: {}'.format(traceback.format_exc()))


# Event handler for the commandCreated event.
class ShowPaletteCommandCreatedHandler(adsk.core.CommandCreatedEventHandler):
    def __init__(self):
        super().__init__()              
    def notify(self, args):
        try:
            command = args.command
            onExecute = ShowPaletteCommandExecuteHandler()
            command.execute.add(onExecute)
            handlers.append(onExecute)
        except:
            _ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


# Event handler for the commandExecuted event.
class SendInfoCommandExecuteHandler(adsk.core.CommandEventHandler):
    def __init__(self):
        super().__init__()
    def notify(self, args):
        try:
            # Send information to the palette. This will trigger an event in the javascript
            # within the html so that it can be handled.
            palette = _ui.palettes.itemById('img2meshPalette')
            if palette:
                palette.sendInfoToHTML('send', 'This is a message sent to the palette from Fusion.')
        except:
            _ui.messageBox('Command executed failed: {}'.format(traceback.format_exc()))


# Event handler for the commandCreated event.
class SendInfoCommandCreatedHandler(adsk.core.CommandCreatedEventHandler):
    def __init__(self):
        super().__init__()              
    def notify(self, args):
        try:
            command = args.command
            onExecute = SendInfoCommandExecuteHandler()
            command.execute.add(onExecute)
            handlers.append(onExecute)   
        except:
            _ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


# Event handler for the palette HTML event.                
class MyHTMLEventHandler(adsk.core.HTMLEventHandler):
    def __init__(self):
        super().__init__()
    def notify(self, args):
        try:
            htmlArgs = adsk.core.HTMLEventArgs.cast(args)            
            data = json.loads(htmlArgs.data)

            objStr = data['obj']
            objStrLen = len(data['obj'])

            if objStrLen > 0:
                fp = tempfile.NamedTemporaryFile(mode='w', suffix='.obj', delete=False)
                fp.writelines(objStr)
                fp.close()
                objFilePath = fp.name
                print ("Generated OBJ File: " + objFilePath)

                global _app

                # Get the current document, otherwise create a new one.
                doc = _app.activeDocument
                if not doc:
                    doc = _app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
                
                design = _app.activeProduct

                # Get the root component of the active design.
                rootComp = design.rootComponent

                # Need to place the mesh in a BaseFeature (non-parametric)
                baseFeats = rootComp.features.baseFeatures
                baseFeat = baseFeats.add()
                baseFeat.startEdit()

                # Add a mesh body by importing this data (OBJ) file.
                meshList = rootComp.meshBodies.add(objFilePath, adsk.fusion.MeshUnits.MillimeterMeshUnit, baseFeat)

                # Need to finish the base feature edit
                baseFeat.finishEdit()

                if meshList.count > 0:
                    # Success - close palette
                    palette = _ui.palettes.itemById('img2meshPalette')
                    if palette:
                        palette.isVisible = False
                    
                    # HACK: bug causes mesh to be placed away from origin
                    # therefore zoom to fit so mesh appears to user
                    vp = _app.activeViewport
                    vp.fit()
        except:
            _ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))


def run(context):
    global _ui, _app
    _app = adsk.core.Application.get()
    _ui  = _app.userInterface
    
    # Add a command that displays the panel.
    showPaletteCmdDef = _ui.commandDefinitions.itemById('showImg2MeshPalette')
    if not showPaletteCmdDef:
        #strTooltip = '<div style=\'font-family:"Calibri";color:#e0e0e0; padding-top:-10px; padding-bottom:10px;\'><span style=\'font-size:20px;\'><b>Image 2 Surface</b></span></div>Use this add-in to convert an image into a surface (mesh).'
        showPaletteCmdDef = _ui.commandDefinitions.addButtonDefinition('showImg2MeshPalette', 'Img 2 Mesh', '', '')

        # Connect to Command Created event.
        onCommandCreated = ShowPaletteCommandCreatedHandler()
        showPaletteCmdDef.commandCreated.add(onCommandCreated)
        handlers.append(onCommandCreated)
    
    # Add the command to the toolbar.
    panel = _ui.allToolbarPanels.itemById('SolidScriptsAddinsPanel')
    cntrl = panel.controls.itemById('showImg2MeshPalette')
    if not cntrl:
        panel.controls.addCommand(showPaletteCmdDef)

def stop(context):
    # Delete the palette created by this add-in.
    palette = _ui.palettes.itemById('img2meshPalette')
    if palette:
        palette.deleteMe()
        
    # Delete controls and associated command definitions created by this add-ins
    panel = _ui.allToolbarPanels.itemById('SolidScriptsAddinsPanel')
    cmd = panel.controls.itemById('showImg2MeshPalette')
    if cmd:
        cmd.deleteMe()
    cmdDef = _ui.commandDefinitions.itemById('showImg2MeshPalette')
    if cmdDef:
        cmdDef.deleteMe()